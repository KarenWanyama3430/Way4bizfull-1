import React from "react";
// import AdminDashBoardMenu from "./AdminDashBoardMenu";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import { AiOutlineUsergroupAdd, AiFillPushpin } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./AdminDashBoard.css";
import DoughnutChart from "./DoughnutChart";
import LineGraph from "./LineGraph";
import {
  getStock,
  fetchNewSellers,
  fetchAdminOrders,
  fetchAdminPendingOrders,
  fetchWeeklySales,
  setPendingOrders,
  fetchUnderReview,
  countComplaints,
  fetchLatestRejectedProducts,
  fetchHeroImages,
  adminInboxCount,
  fetchCategories,
} from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import Image from "../Market/Image";
import MobileLogo from "../Header/MobileLogo";
import AdminHeroImages from "../Seller/AdminHeroImages";
import AdminHeroImagesContainer from "../Seller/AdminHeroImagesContainer";

class AdminDashBoard extends React.Component {
  state = {
    doughnatData: {
      title: "test",
    },
    lineData: {
      data: [20, 10],
    },
  };
  componentDidMount() {
    this.props.getStock();
    this.props.fetchNewSellers();
    this.props.fetchAdminOrders();
    this.props.fetchAdminPendingOrders();
    this.props.fetchWeeklySales();
    this.props.fetchUnderReview();
    this.props.countComplaints();
    this.props.fetchLatestRejectedProducts();
    this.props.fetchHeroImages();
    this.props.adminInboxCount();
    this.props.fetchCategories();
  }

  render() {
    if (
      !this.props.newSellers ||
      !this.props.adminOrders ||
      !this.props.adminPendingOrders ||
      !this.props.weeklySales ||
      !this.props.underReview ||
      !this.props.complaintsCount ||
      !this.props.latestRejectedProducts
    )
      return <ScreenLoader />;

    const todayOrders =
      this.props.adminOrders &&
      this.props.adminOrders.todaysOrdersCount &&
      this.props.adminOrders.todaysOrdersCount.length !== 0 &&
      this.props.adminOrders.todaysOrdersCount[0].todaysOrders;

    const total =
      this.props.adminOrders && this.props.adminOrders.totalOrdersCount;
    const calc = Math.round((todayOrders / total) * 100);
    let { todaysPendingOrders, pendingOrders } = this.props.adminPendingOrders;
    let calcPending;
    if (typeof todaysPendingOrders === "number") {
      calcPending = Math.round((todaysPendingOrders / pendingOrders) * 100);
    } else {
      calcPending = 0;
    }
    if (typeof pendingOrders === "object") {
      pendingOrders = 0;
    }
    function kFormatter(number, decPlaces) {
      // 2 decimal places => 100, 3 => 1000, etc
      decPlaces = Math.pow(10, decPlaces);

      // Enumerate number abbreviations
      var abbrev = ["k", "m", "b", "t"];

      // Go through the array backwards, so we do the largest first
      for (var i = abbrev.length - 1; i >= 0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
          // Here, we multiply by decPlaces, round, and then divide by decPlaces.
          // This gives us nice rounding to a particular decimal place.
          number = Math.round((number * decPlaces) / size) / decPlaces;

          // Handle special case where we round up to the next abbreviation
          if (number === 1000 && i < abbrev.length - 1) {
            number = 1;
            i++;
          }

          // Add the letter for the abbreviation
          number += abbrev[i];

          // We are done... stop
          break;
        }
      }

      return number;
    }
    // console.log("Data is", this.state.lineData.data);
    const todaysComplaints =
      this.props.complaintsCount && this.props.complaintsCount.todaysComplaints;
    const totalComplaints =
      this.props.complaintsCount && this.props.complaintsCount.totalComplaints;
    const complaintsPercentage =
      totalComplaints && todaysComplaints
        ? (todaysComplaints / totalComplaints) * 100
        : 0;
    if (this.props.stock.length !== 0) {
      return (
        <div className="container-fluid dashboard-wrapper">
          <MobileLogo />
          <AdminDashBoardHeader />
          <div className="container-fluid p-0">
            <AdminDashboardSecondaryHeader />
            <div className="container mb-5">
              <div className="row admin-dashboard-top">
                <div
                  className="col-lg-3 admin-big-number-wrapper"
                  style={{ borderRight: "1px solid #eee", height: "100%" }}
                >
                  <div className="admin-big-number">
                    <span>
                      {this.props.newSellers &&
                        this.props.newSellers.sellers &&
                        this.props.newSellers.sellers.length.toLocaleString()}
                    </span>
                    <h3>
                      <AiOutlineUsergroupAdd />
                    </h3>
                  </div>
                  <p>New Sellers</p>
                </div>
                <div
                  className="col-lg-3 admin-big-number-wrapper"
                  style={{ borderRight: "1px solid #eee", height: "100%" }}
                >
                  <div className="admin-big-number">
                    <span>
                      {this.props.stock.find((s) => s.label === "Stock Out")
                        .value &&
                        kFormatter(
                          this.props.stock.find((s) => s.label === "Stock Out")
                            .value,
                          2
                        ).toLocaleString()}
                    </span>
                    <h3>
                      <BsArrowRepeat />
                    </h3>
                  </div>
                  <p>Total Sales</p>
                </div>
                <div
                  className="col-lg-3 admin-big-number-wrapper"
                  style={{ borderRight: "1px solid #eee", height: "100%" }}
                >
                  <div className="admin-big-number">
                    <span>
                      {(
                        this.props.adminOrders &&
                        this.props.adminOrders.monthlyPrice &&
                        kFormatter(this.props.adminOrders.monthlyPrice, 2)
                      ).toLocaleString() || 0}
                    </span>
                    <h3>
                      <FaMoneyBillAlt />
                    </h3>
                  </div>
                  <p>Monthly Profit</p>
                </div>
                <div className="col-lg-3 admin-big-number-wrapper">
                  <div className="admin-big-number">
                    <span>
                      {(
                        this.props.adminOrders &&
                        this.props.adminOrders.totalPrice &&
                        kFormatter(this.props.adminOrders.totalPrice, 2)
                      ).toLocaleString() || 0}
                    </span>
                    <h3>
                      <AiFillPushpin />
                    </h3>
                  </div>
                  <p>Total Profit</p>
                </div>
              </div>
              <div className="row admin-dashboard-center">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 admin-stock-report">
                      <div className="row">
                        <h4 style={{ textAlign: "center", width: "100%" }}>
                          Stock Report
                        </h4>
                      </div>
                      <div className="mt-5">
                        <DoughnutChart
                          data={this.props.stock}
                          colors={"#f76b1a"}
                          title={this.state.doughnatData.title}
                        />
                      </div>
                    </div>
                    <div className="col-lg-8 admin-performance">
                      <div className="row">
                        <h4
                          className="mb-3"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          Performance
                        </h4>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 p-0">
                          <div className="admin-inividual-performance-wrapper">
                            <Link to="/admin-orders">
                              <div className="admin-individual-performance-upper-text">
                                <p>Orders</p>
                                <p>
                                  {this.props.adminOrders &&
                                    this.props.adminOrders.totalOrdersCount &&
                                    this.props.adminOrders.totalOrdersCount.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontSize: "12px" }}>
                                  {todayOrders ? calc : 0}% change in the past
                                  24 hours
                                </p>
                              </div>
                            </Link>
                          </div>
                          <div className="admin-inividual-performance-wrapper">
                            <Link
                              to="/admin-orders"
                              onClick={() => this.props.setPendingOrders()}
                            >
                              <div className="admin-individual-performance-upper-text">
                                <p>
                                  Pending Orders{" "}
                                  {todaysPendingOrders && (
                                    <span
                                      className="badge"
                                      style={{
                                        color: "#fff",
                                        backgroundColor: "#f76b1a",
                                      }}
                                    >
                                      {todaysPendingOrders}
                                    </span>
                                  )}
                                </p>
                                <p>
                                  {pendingOrders &&
                                    pendingOrders.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontSize: "12px" }}>
                                  {calcPending}% change in the past 24 hours
                                </p>
                              </div>
                            </Link>
                          </div>
                          <div className="admin-inividual-performance-wrapper">
                            <Link to="/admin/new-products">
                              <div className="admin-individual-performance-upper-text">
                                <p>
                                  New Products{" "}
                                  {this.props.underReview.length !== 0 && (
                                    <span
                                      className="badge"
                                      style={{
                                        color: "#fff",
                                        backgroundColor: "#f76b1a",
                                      }}
                                    >
                                      {this.props.underReview.length}
                                    </span>
                                  )}
                                </p>
                                <p>{this.props.adminOrders.totalProducts}</p>
                              </div>
                              <div>
                                <p style={{ fontSize: "12px" }}>
                                  {this.props.adminOrders.totalProducts !== 0
                                    ? (
                                        (this.props.underReview.length /
                                          this.props.adminOrders
                                            .totalProducts) *
                                        100
                                      ).toFixed(2)
                                    : 0}
                                  % change
                                </p>
                              </div>
                            </Link>
                          </div>
                          <div className="admin-inividual-performance-wrapper">
                            <div style={{ cursor: "hover" }}>
                              <div className="admin-individual-performance-upper-text">
                                <p>Payments</p>
                                <p>
                                  {this.props.adminOrders &&
                                    this.props.adminOrders.totalPrice &&
                                    this.props.adminOrders.totalPrice.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontSize: "12px" }}>
                                  {(
                                    (this.props.adminOrders.todayTotalPrice /
                                      this.props.adminOrders.totalPrice) *
                                    100
                                  ).toFixed(2)}
                                  % change in the past 24 hours
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="admin-inividual-performance-wrapper">
                            <Link to="/admin/complaints">
                              <div className="admin-individual-performance-upper-text">
                                <p>
                                  Complaints{" "}
                                  {todaysComplaints && todaysComplaints !== 0 && (
                                    <span
                                      className="badge"
                                      style={{
                                        color: "#fff",
                                        backgroundColor: "#f76b1a",
                                      }}
                                    >
                                      {todaysComplaints}
                                    </span>
                                  )}
                                </p>
                                <p>{totalComplaints}</p>
                              </div>
                              <div>
                                <p style={{ fontSize: "12px" }}>
                                  {complaintsPercentage === 100
                                    ? complaintsPercentage
                                    : complaintsPercentage.toFixed(2)}
                                  % change in the past 24 hours
                                </p>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <LineGraph
                            data={this.state.lineData.data}
                            colors={"#f76b1a"}
                            title={this.state.title}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row admin-dashboard-bottom px-2">
                <h5 style={{ textAlign: "center" }} className="my-2">
                  Latest Rejected Products
                </h5>
                {/* mapping here */}
                {this.props.latestRejectedProducts.length !== 0 &&
                  this.props.latestRejectedProducts.map((p) => (
                    <div key={p._id} className="rejected-product box-container">
                      <div className="rejected-product-image-wrapper">
                        <Image
                          width="80%"
                          style={{ margin: "auto" }}
                          image={
                            p.imageUrl.includes("http")
                              ? p.imageUrl
                              : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${p.imageUrl} `
                          }
                          alt={p.imageUrl}
                        />
                      </div>
                      <div className="rejected-product-content">
                        <h6 className="my-1">
                          <strong>Name: </strong>
                          {p.name}
                        </h6>
                        <h6 className="my-1">
                          <strong>Owner: </strong>
                          <Link
                            to={`/seller/store/${p.sellerId}`}
                            className="reject-to-store"
                            title="visit store"
                          >
                            {p.sellerFirstName} {p.sellerLastName}
                          </Link>
                        </h6>
                        <p>{p.body}</p>
                      </div>
                    </div>
                  ))}

                <div className="all-rejects">
                  <Link to="/admin/rejects">View All</Link>
                </div>
              </div>

              <div className="row admin-dashboard-bottom py-2">
                <h5 style={{ textAlign: "center" }} className="my-2">
                  Hero Images
                </h5>
                <div className="admin-hero-upload-section">
                  <AdminHeroImages />
                </div>

                <div className="admin-hero-uploads">
                  <AdminHeroImagesContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <ScreenLoader />;
  }
}
const mapStateToProps = (state) => {
  return {
    stock: state.admin.stock,
    adminOrders: state.admin.adminOrders,
    adminPendingOrders: state.admin.adminPendingOrders,
    complaintsCount: state.admin.complaintsCount,
    latestRejectedProducts: state.admin.latestRejectedProducts,
    underReview: state.admin.underReview,
    weeklySales: state.admin.weeklySales,
    newSellers: state.admin.newSellers,
  };
};
export default connect(mapStateToProps, {
  getStock,
  fetchNewSellers,
  fetchAdminOrders,
  fetchAdminPendingOrders,
  fetchWeeklySales,
  setPendingOrders,
  fetchUnderReview,
  countComplaints,
  fetchLatestRejectedProducts,
  fetchHeroImages,
  adminInboxCount,
  fetchCategories,
})(AdminDashBoard);
