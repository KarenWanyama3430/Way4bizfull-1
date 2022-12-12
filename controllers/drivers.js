const { check, validationResult } = require("express-validator");
const Driver = require("../models/Driver");
const route = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isDriver = require("../middlewares/is-driver");
const auth = require("../middlewares/is-auth");
const isAdmin = require("../middlewares/is-admin");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Delivery = require("../models/Delivery");
const distance = require("google-distance-matrix");

const confirmEmailTemplate = require("../mails/confirmEmail");

const transporter = nodeMailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
);

route.post(
  "/api/driver/register",
  auth,
  isAdmin,
  check("email").trim().isEmail().withMessage("Please enter a valid email"),
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("Please provide a valid first name"),
  check("lastName")
    .trim()
    .notEmpty()
    .withMessage("please provide a valid last name"),
  check("phoneNumber")
    .isNumeric()
    .withMessage("please enter a valid phone number"),
  check("vehicleNo")
    .trim()
    .isLength({ min: 1 })
    .withMessage("please enter a valid vehicle number"),
  check("IdNumber").isNumeric().withMessage("please enter a valid Id number"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send({ message: errors.array()[0].msg });
      }
      const {
        email,
        firstName,
        lastName,
        phoneNumber,
        IdNumber,
        vehicleNo
      } = req.body;
      const password = crypto.randomBytes(6).toString("base64");
      const driverExists = await Driver.findOne({ email });
      if (driverExists) {
        return res
          .status(401)
          .send({ message: "a driver with that email already exists" });
      }

      const hashedPass = await bcrypt.hash(password, 12);
      const driver = new Driver({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPass,
        phoneNumber,
        IdNumber,
        vehicleNo,
        location: { type: "Point", coordinates: [0, 0] }
      });
      const token = jwt.sign(
        { _id: driver._id },
        process.env.CONFIRM_EMAIL_JWT,
        {
          expiresIn: "1 hour"
        }
      );
      await driver.save();
      const url = `${process.env.DRIVER_CONFIRM_REDIRECT}/${token}`;
      transporter.sendMail(
        {
          to: email,
          from: "contact@way4biz.com",
          subject: "Email Confirmation",
          html: confirmEmailTemplate(url, { password: password })
        },
        (error, info) => {
          if (error) {
            console.log(error);
          }
          console.log(info);
        }
      );
      res.status(201).send({
        message:
          "An email has been sent to your email address, please check it to confirm your account"
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

route.get("/api/confirm/driver/:driverToken", async (req, res) => {
  try {
    const { driverToken } = req.params;
    const decoded = jwt.verify(driverToken, process.env.CONFIRM_EMAIL_JWT);
    if (!decoded._id) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const driver = await Driver.findById(decoded._id);
    if (!driver) {
      return res.status(401).send({ message: "No driver with that email" });
    }
    driver.verified = true;
    await driver.save();
    res.redirect("/driver/sign-in");
  } catch (error) {
    res.status(500).send(error);
  }
});

route.post(
  "/api/driver/login",
  check("email").trim().isEmail().withMessage("please enter a valid email"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters min"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send({ message: errors.array()[0].msg });
      }
      const {
        email,
        password,
        location: { lat, lng }
      } = req.body;
      const driver = await Driver.findOne({ email: email.toLowerCase() });
      if (!driver) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(password, driver.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
      if (!driver.verified) {
        return res.status(401).send({ message: "Email not verified" });
      }
      console.log(req.body);
      driver.location.type = "Point";
      driver.location.coordinates = [lng, lat];
      await driver.save();
      req.session.user = driver;
      req.session.isLoggedIn = true;
      res.send(driver);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

route.post(
  "/api/request/service",
  auth,
  check("itemName").trim().notEmpty().withMessage("please enter item name"),
  check("itemQuantity")
    .isNumeric()
    .withMessage("please enter a valid item quantity"),
  check("receiverFullName")
    .trim()
    .notEmpty()
    .withMessage("enter a valid receiver's name"),
  check("receiverPhoneNumber")
    .isNumeric()
    .withMessage("enter a valid phone number"),
  check("receiverCity")
    .trim()
    .notEmpty()
    .withMessage("enter a valid receiver's city"),
  check("receiverAddress")
    .trim()
    .notEmpty()
    .withMessage("enter a valid receiver's town"),
  check("origins.lat").isNumeric(),
  check("origins.lng").isNumeric(),
  check("destination.lat").isNumeric(),
  check("destination.lng").isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send({ message: errors.array()[0].msg });
      }

      // **TODO** LOGIC TO OBTAIN NEAREST DRIVER
      // const driver = await Driver.geoNear(
      //   {
      //     type: "Point",
      //     coordinates: [36.8934912, -1.2812287999999998]
      //   },
      //   { spherical: true, maxDistance: 20000 }
      // );
      const {
        itemName,
        itemQuantity,
        receiverFullName,
        receiverPhoneNumber,
        receiverCity,
        receiverAddress,
        origins,
        destination
      } = req.body;

      const mode = "DRIVING";
      distance.key(process.env.MATRIX);
      distance.matrix(
        [`${origins.lat},${origins.lng}`],
        [`${destination.lat},${destination.lng}`],
        mode,
        async (err, response) => {
          if (err) return res.status(404).send(err);
          const charge =
            (response.rows[0].elements[0].distance.value / 1000) * 10;

          const driver = await Driver.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [origins.lng, origins.lat]
                },
                maxDistance: 4000000,
                spherical: true,
                distanceField: "dist.calculated",
                includeLocs: "dist.location",
                query: {
                  free: true,
                  verified: true
                }
              }
            }
          ]);

          if (!driver || (driver && driver.length === 0)) {
            return res.send([]);
          }
          const delivery = new Delivery({
            itemName,
            itemQuantity,
            receiverFullName,
            receiverPhoneNumber,
            receiverCity,
            receiverAddress,
            user: req.session.user._id,
            driver: driver[0]._id,
            charge,
            userSeller: req.session.user._id
          });
          await delivery.save();
          res.send({ delivery, driver: driver[0] });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

route.post(
  "/api/confirm/delivery",
  auth,
  check("deliveryId").trim().notEmpty().withMessage("enter a delivery ID"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send({ message: errors.array()[0].msg });
      }

      const { deliveryId } = req.body;
      const updatedDel = await Delivery.findByIdAndUpdate(deliveryId, {
        confirmed: true
      })
        .populate("driver", "phoneNumber vehicleNo")
        .select("driver");
      // **TODO**  ALERT DRIVER VIA FIREBASE

      res.send(updatedDel);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

route.get("/api/driver/clients", isDriver, async (req, res) => {
  try {
    const { _id } = req.session.user;
    const deliveries = await Delivery.find({
      driver: _id,
      confirmed: true
    }).populate(
      "user userSeller",
      "firstName lastName phoneNumber address town phoneNumber"
    );
    res.send(deliveries);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = route;
