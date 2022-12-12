import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { connect } from "react-redux";
import SellerImage from "./SellerImage";
import "./SellerDocuments.css";
import { FaTrashAlt } from "react-icons/fa";
import { deleteSellerImage } from "../../redux/actions";

class SellerDocuments extends React.Component {
  state = {
    idUploaded: false,
    passportUploaded: false,
  };

  componentDidMount() {
    this.props.proceed(false);
    scroll.scrollToTop();
    if (this.props.sellerImageUrl.length > 1) {
      this.props.proceed(true);
    }
  }

  componentDidUpdate() {
    if (this.props.sellerImageUrl.length > 1) {
      this.props.proceed(true);
    }
  }

  render() {
    return (
      <div className="container" style={{ textAlign: "center" }} id="seller-orientation-documents-wrapper">
        <h5>
          Please upload valid copies of the following documents. (National ID
          and Profile Photo)
        </h5>

        <SellerImage />

        <br />
        {this.props.sellerImageUrl.length !== 0 ? (
          <React.Fragment>
            {" "}
            <h4>Uploads</h4>
            <div className="seller-uploads-wrapper">
              {this.props.sellerImageUrl.length !== 0 &&
                this.props.sellerImageUrl.map((url, i) => (
                  <div key={i}>
                    <img
                      src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${url}`}
                      alt={url}
                    />
                    <div
                      className="seller-uploads-trash-button-wrapper"
                      onClick={() => this.props.deleteSellerImage(url)}
                    >
                      <button className="btn seller-uploads-trash-button">
                        <FaTrashAlt />
                        <span className="ml-1">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sellerImageUrl: state.sellerDetails.sellerImageUrl,
  };
};
export default connect(mapStateToProps, { deleteSellerImage })(SellerDocuments);
