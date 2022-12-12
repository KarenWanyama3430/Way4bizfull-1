import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Pages/Home";
import Cart from "./components/Pages/Cart";
import Authenticate from "./components/Authenticate/Authenticate";
import AddressForm from "./components/Checkout/AddressForm";
import CheckOut from "./components/Checkout/Checkout";
import { connect } from "react-redux";
import "./App.css";
import Account from "./components/Account/Account";
import ChangePassword from "./components/Account/changePassword";
import Orders from "./components/Account/Orders";
import Wishlist from "./components/Account/Wishlist";
import {
  fetchUser,
  fetchProducts,
  fetchCategories,
  saveCartItems,
  saveWishlistItems,
  fetchCartItems,
  fetchWishlistProducts,
  fetchAllCategories,
  fetchHeroImages
} from "./redux/actions";
import ForgotPassword from "./components/Authenticate/ForgotPassword";
// import MobileLogo from "./components/Header/MobileLogo";
import NotFound from "./components/Pages/NotFound";
import MainCategories from "./components/MainCategories/MainCategories";
import SellerDashBoard from "./components/Seller/SellerDashBoard";
import SellerRegister from "./components/Account/SellerRegister";
import SellerPhoneNumber from "./components/Account/SellerPhoneNumber";
import VerifySellerNumber from "./components/Account/VerifySellerNumber";
import SellerLogin from "./components/Account/SellerLogin";
import ResetPassword from "./components/Authenticate/ResetPassword";
import AdminDashBoard from "./components/Admin/AdminDashBoard";
import SellerOrders from "./components/Seller/SellerOrders";
import Review from "./components/Seller/SellerDashBoardReviews";
import SellerProducts from "./components/Seller/SellerProducts";
import SellerDashBoardNewProduct from "./components/Seller/SellerDashBoardNewProduct";
import SellerDashBoardProductEdit from "./components/Seller/SellerDashBoardProductEdit";
import SellerOrderDetails from "./components/Seller/SellerOrderDetails";
import "react-responsive-tabs/styles.css";
import BuyerOrderDetails from "./components/Account/BuyerOrderDetails";
import ProductParent from "./components/Products/ProductParent";
import PendingReviews from "./components/Account/PendingReviews";
import ProductReviewsWrapper from "./components/Product/ProductReviewsWrapper";
import ParentProduct from "./components/Product/ParentProduct";
import AddReview from "./components/Account/AddReview";
import ScreenLoader from "./components/Pages/ScreenLoader";
import AdminDashBoardSellers from "./components/Admin/AdminDashBoardSellers";
import AdminDashBoardSeller from "./components/Admin/AdminDashBoardSeller";
import AdminDashBoardNewSellers from "./components/Admin/AdminDashBoardNewSellers";
import AdminDashBoardNewSeller from "./components/Admin/AdminDashBoardNewSeller";
import SellerProfiling from "./components/Seller/SellerProfiling";
import AdminDashBoardOrders from "./components/Admin/AdminDashBoardOrders";
import AdminDashBoardOrder from "./components/Admin/AdminDashBoardOrder";
import AdminDashBoardCategories from "./components/Admin/AdminDashBoardCategories";
import AdminDashBoardAddCategory from "./components/Admin/AdminDashBoardAddCategory";
import MoveToTop from "./MoveToTop";
import AdminDashBoardEditCategory from "./components/Admin/AdminDashBoardEditCategory";
import AdminDashBoardOrderItems from "./components/Admin/AdminDashBoardOrderItems";
import Store from "./components/Store/Store";
import SearchResults from "./components/Header/SearchResults";
import AdminDashBoardNewProducts from "./components/Admin/AdminDashBoardNewProducts";
import AdminDashBoardNewProduct from "./components/Admin/AdminDashBoardNewProduct";
import AdminDashBoardNewProductReject from "./components/Admin/AdminDashBoardNewProductReject";
import SellerSettings from "./components/Seller/SellerSettings";
import SellerRejects from "./components/Seller/SellerRejects";
import AdminDashBoardComplaints from "./components/Admin/AdminDashBoardComplaints";
import AdminDashBoardComplaint from "./components/Admin/AdminDashBoardComplaint";
import AdminDashBoardRejects from "./components/Admin/AdminDashBoardRejects";
import FileComplain from "./components/Account/FileComplain";
import AccountComplaints from "./components/Account/AccountComplaints";
import AccountComplaint from "./components/Account/AccountComplaint";
import MpesaPayment from "./components/Checkout/MpesaPayment";
import OrderPaymentSuccess from "./components/Checkout/OrderPaymentSuccess";
import CardPayment from "./components/CardPayment/CardPayment";
import CardPaymentError from "./components/CardPayment/CardPaymentError";
import MpesaError from "./components/Checkout/MpesaError";
import NormalDelivery from "./components/Checkout/NormalDelivery";
import ExpressDelivery from "./components/Checkout/ExpressDelivery";
import Logistics from "./components/Pages/Logistics";
import About from "./components/Pages/HelpCenter/About";
import TermsConditions from "./components/Pages/HelpCenter/TermsConditions";
import PrivacyPolicy from "./components/Pages/HelpCenter/PrivacyPolicy";
import Contact from "./components/Pages/HelpCenter/Contact";
import HowToSell from "./components/Pages/HelpCenter/HowToSell";
import SupportCenter from "./components/Pages/HelpCenter/SupportCenter";
import CustomerService from "./components/Pages/HelpCenter/CustomerService";
import HelpCenter from "./components/Pages/HelpCenter/HelpCenter";
import AdminDashBoardInbox from "./components/Admin/AdminDashBoardInbox";
import SellerPoints from "./components/Seller/SellerPoints";
import ContactSuccess from "./components/Pages/HelpCenter/ContactSuccess";
import AdminDashBoardRedeems from "./components/Admin/AdminDashBoardRedeems";
import ReturnPolicy from "./components/Pages/HelpCenter/ReturnPolicy";
import Riders from "./components/Riders/Riders";
import RiderLogin from "./components/Riders/RiderLogin";
import AdminAddDriver from "./components/Admin/AdminAddDriver";
import AdminDrivers from "./components/Admin/AdminDrivers";
import AdminDriver from "./components/Admin/AdminDriver";
import RiderChangePassword from "./components/Riders/RiderChangePassword";
import LogisticsPayment from "./components/Pages/LogisticsPayment";
import Logistics404 from "./components/Pages/Logistics404";
import CartItemsRedirect from "./components/Pages/CartItemsRedirect";
import AccountLogistics from "./components/Account/AccountLogistics";
import AccountLogistic from "./components/Account/AccountLogistic";

class App extends React.Component {
  state = {
    scrolling: false
  };
  componentDidMount() {
    const {
      fetchUser,
      fetchProducts,
      fetchCategories,
      fetchAllCategories,
      fetchHeroImages
    } = this.props;
    fetchUser();
    fetchProducts();
    fetchCategories();
    fetchAllCategories();
    fetchHeroImages();
    window.addEventListener("scroll", this.handleScroll);
    this.scrolled = false;
    this.setState({
      scrolling: false
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.isSignedIn &&
      JSON.stringify(prevProps.cart) !== JSON.stringify(this.props.cart)
    ) {
      this.props.cart.length !== 0 &&
        this.props.saveCartItems(
          this.props.cart.map(i => ({
            freeShipping: i.freeShipping,
            name: i.name,
            price: i.price,
            stockQuantity: i.stockQuantity,
            imageUrl: i.imageUrl,
            seller: { storeName: i.seller.storeName },
            _id: i._id,
            quantity: i.quantity
          }))
        );
    }
    if (
      this.props.isSignedIn &&
      JSON.stringify(prevProps.wishlist) !== JSON.stringify(this.props.wishlist)
    ) {
      this.props.wishlist.length !== 0 &&
        this.props.saveWishlistItems(
          this.props.wishlist.map(i => ({
            freeShipping: i.freeShipping,
            name: i.name,
            price: i.price,
            stockQuantity: i.stockQuantity,
            seller: { storeName: i.seller.storeName },
            imageUrl: i.imageUrl,
            _id: i._id
          }))
        );
    }

    if (prevState.scrolling !== this.state.scrolling) {
      this.scrolled = false;
    }
    let scrollTopDistance = window.pageYOffset;
    if (
      scrollTopDistance > 700 &&
      prevState.scrolling === false &&
      prevState.scrolling !== this.state.scrolling
    ) {
      this.setState({
        scrolling: true
      });

      this.scrolled = true;
    }

    if (
      prevState.scrolling &&
      prevState.scrolling !== this.state.scrolling &&
      scrollTopDistance > 700
    ) {
      this.setState({
        scrolling: false
      });
      this.scrolled = false;
    }
  }

  handleScroll = e => {
    let scrollTopDistance = window.pageYOffset;
    if (scrollTopDistance > 700) {
      this.setState({
        scrolling: true
      });

      this.scrolled = true;
    } else {
      this.setState({
        scrolling: false
      });
      this.scrolled = false;
    }
  };

  render() {
    if (
      window.location.protocol !== "https:" &&
      process.env.NODE_ENV === "production"
    ) {
      window.location.replace(
        `https:${window.location.href.substring(
          window.location.protocol.length
        )}`
      );
    }

    if (this.props.isSignedIn !== null) {
      return (
        <div id="main">
          {this.scrolled && this.state.scrolling ? <MoveToTop /> : null}
          {/* <MobileLogo /> */}

          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about-us" component={About} />
              <Route path="/terms" component={TermsConditions} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/how-to-sell" component={HowToSell} />
              <Route path="/support-center" component={SupportCenter} />
              <Route path="/customer-service" component={CustomerService} />
              <Route path="/normal-delivery" component={NormalDelivery} />
              <Route path="/express-delivery" component={ExpressDelivery} />
              <Route path="/logistics" exact component={Logistics} />
              <Route path="/notfound" exact component={NotFound} />
              <Route
                path="/logistics/confirm/:deliveryId"
                component={LogisticsPayment}
              />
              <Route
                path="/cart/redirect"
                exact
                component={CartItemsRedirect}
              />
              <Route path="/logistics-404" component={Logistics404} />
              <Route path="/return-policy" component={ReturnPolicy} />
              <Route path="/help-center" component={HelpCenter} />
              <Route
                path="/riders"
                render={() =>
                  this.props.isSignedIn ? (
                    <Riders />
                  ) : (
                    <Redirect to="/driver/sign-in" />
                  )
                }
              />

              <Route
                path="/driver/sign-in"
                render={() =>
                  !this.props.isSignedIn ? <RiderLogin /> : <Redirect to="/" />
                }
              />
              <Route
                path="/rider/change/password"
                render={() =>
                  this.props.isSignedIn ? (
                    <RiderChangePassword />
                  ) : (
                    <Redirect to="/driver/sign-in" />
                  )
                }
              />
              <Route
                path="/product/main/reviews/:productId"
                exact
                component={ProductReviewsWrapper}
              />
              <Route
                path="/contact-us"
                render={() =>
                  this.props.isSignedIn ? (
                    <Contact />
                  ) : (
                    <Redirect to="/sign-in" />
                  )
                }
              />
              <Route
                path="/contact-success"
                render={() =>
                  this.props.isSignedIn ? (
                    <ContactSuccess />
                  ) : (
                    <Redirect to="/sign-in" />
                  )
                }
              />
              <Route
                path="/seller/profiling"
                exact
                render={() =>
                  this.props.user &&
                  this.props.user.verifiedPhoneNumber &&
                  !this.props.user.isSeller ? (
                    <SellerProfiling />
                  ) : (
                    <Redirect to="/seller-dashboard" />
                  )
                }
              />
              <Route path="/seller/store/:sellerId" exact component={Store} />
              <Route path="/search/results" component={SearchResults} />
              <Route
                path="/admin-sellers"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardSellers />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/add-driver"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminAddDriver />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/drivers"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDrivers />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/driver/:driverId"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDriver />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/complaints"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardComplaints />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/complaint/:complaintId"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardComplaint />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/rejects"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardRejects />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-redeems"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardRedeems />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-orders"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardOrders />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-order/:orderId"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardOrder />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-categories"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardCategories />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/root/admin-order/view-items/:orderId"
                exact
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardOrderItems />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/new-products"
                exact
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardNewProducts />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/new-product/:productId"
                exact
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardNewProduct />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-inbox"
                exact
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardInbox />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin/root/new-product/why-reject/:productId"
                exact
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardNewProductReject />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-category/add"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardAddCategory />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-category/edit/:categoryId"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardEditCategory />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-seller/:sellerId"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardSeller />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-new-sellers"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardNewSellers />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-new-seller/:sellerId"
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoardNewSeller />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/products/category/:category"
                exact
                component={ProductParent}
              />
              <Route
                path="/order/details/:orderId"
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <SellerOrderDetails />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/points"
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <SellerPoints />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/seller-dashboard"
                exact
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <SellerDashBoard />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/seller-orders"
                exact
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <SellerOrders />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/seller/settings"
                exact
                render={() =>
                  this.props.user ? (
                    <SellerSettings />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/seller/sell"
                exact
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <SellerDashBoardNewProduct />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/seller/products/rejected"
                exact
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <SellerRejects />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/seller-review"
                exact
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <Review />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/seller-products"
                exact
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <SellerProducts />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/seller/edit/:productId"
                exact
                render={() =>
                  this.props.user && this.props.user.verifiedPhoneNumber ? (
                    <SellerDashBoardProductEdit />
                  ) : (
                    <Redirect to="/seller/sign-in" />
                  )
                }
              />
              <Route
                path="/admin-dashboard"
                exact
                render={() =>
                  this.props.user && this.props.user.isAdmin ? (
                    <AdminDashBoard />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />

              <Route
                path="/password/reset"
                exact
                render={() =>
                  this.props.isSignedIn === true ? (
                    <Redirect to="/" />
                  ) : (
                    <ForgotPassword />
                  )
                }
              />
              <Route
                path="/product/:productId"
                exact
                component={ParentProduct}
              />
              <Route path="/categories" exact component={MainCategories} />
              <Route path="/cart" exact component={Cart} />
              <Route
                path="/confirm/phoneNumber"
                exact
                render={() =>
                  this.props.isSignedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <SellerPhoneNumber />
                  )
                }
              />
              <Route
                path="/number/verify"
                exact
                render={() =>
                  this.props.isSignedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <VerifySellerNumber />
                  )
                }
              />
              <Route
                path="/seller/register"
                exact
                render={() =>
                  this.props.isSignedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <SellerRegister />
                  )
                }
              />
              <Route
                path="/seller/register/referral/:referralCode"
                exact
                render={() =>
                  this.props.isSignedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <SellerRegister />
                  )
                }
              />
              <Route
                path="/seller/sign-in"
                exact
                render={() =>
                  this.props.isSignedIn ? <Redirect to="/" /> : <SellerLogin />
                }
              />
              <Route
                path="/password/reset/callback"
                exact
                render={() =>
                  this.props.isSignedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <ResetPassword />
                  )
                }
              />
              <Route
                path="/address"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <AddressForm />
                  )
                }
              />
              <Route
                path="/account-logistics"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <AccountLogistics />
                  )
                }
              />

              <Route
                path="/logistic/:deliveryId"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <AccountLogistic />
                  )
                }
              />
              <Route
                path="/buyer/file-complain/:orderId/:productId"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <FileComplain />
                  )
                }
              />
              <Route
                path="/add/review/:productId/:orderId"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <AddReview />
                  )
                }
              />
              <Route
                path="/pending/reviews"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <PendingReviews />
                  )
                }
              />
              <Route
                path="/products/search/:searchTerm"
                exact
                component={SearchResults}
              />
              <Route
                path="/checkout"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <CheckOut />
                  )
                }
              />
              <Route
                path="/mpesa-payment"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <MpesaPayment />
                  )
                }
              />
              <Route
                path="/order/success"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <OrderPaymentSuccess />
                  )
                }
              />
              {/* <Route
                path="/card-payment"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <CardPayment />
                  )
                }
              /> */}
              <Route
                path="/account"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <Account />
                  )
                }
              />

              <Route
                path="/buyer/order/details/:orderId"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <BuyerOrderDetails />
                  )
                }
              />

              <Route
                path="/orders"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <Orders />
                  )
                }
              />
              <Route
                path="/complaints"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <AccountComplaints />
                  )
                }
              />
              <Route
                path="/complaint/:complaintId"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <AccountComplaint />
                  )
                }
              />
              <Route
                path="/card/payment"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <CardPayment />
                  )
                }
              />
              <Route
                path="/wishlist"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <Wishlist />
                  )
                }
              />
              <Route
                path="/change-password"
                exact
                render={() =>
                  this.props.isSignedIn === false ? (
                    <Redirect to="/sign-in" />
                  ) : (
                    <ChangePassword />
                  )
                }
              />
              <Route
                path="/sign-in"
                exact
                render={() =>
                  this.props.isSignedIn ? <Redirect to="/" /> : <Authenticate />
                }
              />
              <Route
                path="/mpesa/error"
                exact
                render={() =>
                  this.props.isSignedIn ? <MpesaError /> : <Redirect to="/" />
                }
              />
              <Route
                path="/card/error"
                exact
                render={() =>
                  this.props.isSignedIn ? (
                    <CardPaymentError />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      );
    }
    return <ScreenLoader />;
  }
}
const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth.user,
    loading: state.auth.loading,
    cart: state.cartReducer.cart,
    wishlist: state.cartReducer.wishlist
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  fetchProducts,
  fetchCategories,
  saveCartItems,
  fetchAllCategories,
  fetchCartItems,
  fetchWishlistProducts,
  saveWishlistItems,
  fetchHeroImages
})(App);
