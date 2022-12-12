const cluster = require("cluster");
const os = require("os");
const path = require("path");
if (cluster.isMaster) {
  // MASTER PROCESS
  const n_cpus = os.cpus().length;
  console.log(`forking ${n_cpus} processes`);
  for (let i = 0; i < n_cpus; i++) {
    cluster.fork();
  }
} else {
  // CHILD PROCESS
  const express = require("express");
  const mongoose = require("mongoose");
  const session = require("express-session");
  const MongoStore = require("connect-mongodb-session")(session);
  const bodyParser = require("body-parser");
  const passport = require("passport");
  const helmet = require("helmet");
  const compression = require("compression");
  const cors = require("cors");

  const adminRoutes = require("./controllers/admin");
  const authRoutes = require("./controllers/auth");
  const shopRoutes = require("./controllers/shop");
  const driversRoutes = require("./controllers/drivers");
  require("./services/passport");

  const app = express();

  app.use(cors({ origin: "https://way4biz-e-commerce.herokuapp.com" }));
  app.all("*", (req, res, next) => {
    if (req.get("host").includes("http://way4biz-e-commerce.herokuapp.com")) {
      return res.redirect(
        301,
        "https://way4biz-e-commerce.herokuapp.com" + req.path
      );
    }
    next();
  });
  const sessionStore = new MongoStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });
  const mongooseConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("connected to the database");
  };
  mongooseConnect();
  if (process.env.NODE_ENV === "production") {
    // app.use(
    //   helmet.contentSecurityPolicy({
    //     directives: {
    //       defaultSrc: ["'self'", "filesystem ", "'unsafe-inline'"],
    //       scriptSrc: [
    //         "https://code.jquery.com/",
    //         "https://*.googleapis.com/",
    //         "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/",
    //         "'self'",
    //         "'unsafe-inline'",
    //         "https://js.stripe.com/",
    //       ],
    //       imgSrc: [
    //         " https://e-commerce-gig.s3.eu-west-2.amazonaws.com/",
    //         "'self'",
    //         "https://ke.jumia.is",
    //         "blob:",
    //         "data:",
    //         "'unsafe-eval'",
    //         "https://*.googleapis.com/",
    //       ],
    //       objectSrc: ["data: 'unsafe-eval'"],
    //       frameSrc: ["https://js.stripe.com/"],
    //       styleSrc: [
    //         "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/",
    //         "https://*.googleapis.com/",
    //         "'self'",
    //         "'unsafe-inline'",
    //       ],
    //       connectSrc: [
    //         "*",
    //         "'self'",
    //         "'unsafe-eval'",
    //         "'unsafe-hashes'",
    //         "'unsafe-inline'",
    //         " https://e-commerce-gig.s3.eu-west-2.amazonaws.com/",
    //       ],
    //       fontSrc: ["*", "https://*.googleapis.com/"],
    //     },
    //   })
    // );
    app.use(compression());
  }
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      store: sessionStore,
      cookie: {
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.PRODUCTION,
      },
    })
  );
  app.use(authRoutes);
  app.use(shopRoutes);
  app.use(adminRoutes);
  app.use(driversRoutes);

  if (process.env.NODE_ENV === "production") {
    // SERVING STATIC FILES
    app.use(express.static("client/build"));
    // SERVE UP INDEX.HTML IF IT DOESNOT RECORGANISE THE ROUTE
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  app.listen(process.env.PORT, () =>
    console.log(`server started on port ${process.env.PORT}`)
  );
}
