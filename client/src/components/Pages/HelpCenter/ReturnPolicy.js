import React from "react";
import HelpCenterHeader from "./HelpCenterHeader";
import "./ReturnPolicy.css";
import Footer from "../../Footer/Footer";
import MiniMenuWrapper from "../../MiniMenuWrapper/MiniMenuWrapper";

class ReturnPolicy extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="content white-body">
          <HelpCenterHeader />
          <div className="container">
            <h3 style={{ textAlign: "center" }} className="my-2">
              Return Policy
            </h3>
            <div className="return-content">
              <h6>
                We want you to be happy with your purchase. If you are not
                completely satisfied, you can return the product to us and we
                will either repair/replace it, or credit your account, subject
                to the below terms. This Policy applies to products bought from
                Way4Biz This Policy forms part of the Way4Biz Terms and
                Conditions, and so words defined in the Terms and Conditions
                have the same meaning in this Policy, unless the context
                indicates otherwise. Nothing in this Policy is intended to limit
                your statutory rights in any way.
              </h6>

              <h4>Preparing your products for a return</h4>
              <h6>
                To ensure your request is processed as quickly as possible you
                are responsible for the following when returning your products;
              </h6>
              <ul>
                <li>
                  <p>
                    package your products safely and securely for protection
                    during transit;
                  </p>
                </li>
                <li>
                  <p>
                    clearly mark your return reference number on the outside of
                    the parcel; and
                  </p>
                </li>
                <li>
                  <p>
                    include all accessories and parts that were sold with the
                    product.
                  </p>
                </li>
              </ul>
              <h6>
                Failure to adhere to any of these requirements could delay the
                processing of your request or result in its decline altogether.
              </h6>

              <h4>Unwanted Products</h4>
              <h6>You can return an unwanted product to us at no charge, provided:</h6>
              <ul>
                <li>
                  <p>
                  it is undamaged and unused, with the original labels and stickers still attached;
                  </p>
                </li>
                <li>
                  <p>
                  it is not missing any accessories or parts;
                  </p>
                </li>
                <li>
                  <p>
                  you log a return on the Website within <strong>15 days after delivery</strong> to you or collection by you of the unwanted product.
                  </p>
                </li>
                <li>
                  <p>
                  it is not one of the products listed below.
                  </p>
                </li>
              </ul>
              <h6>Changed your mind?</h6>
              <p>Where you have changed your mind and would like a credit for a product, you can return it – provided the product is not:</p>
              <ul>
              <li><p>a digital product such as an eBook, electronic voucher, gaming code or other digital download;</p></li> 
              <li><p>an audio or video recording or computer software that has been unsealed;</p></li> 
              <li><p>a newspaper, periodical or magazine;</p></li> 
              <li><p>a foodstuff, beverage or other product intended for everyday consumption;</p></li> 
              <li><p>a nursing or maternity product, an infant bottle, infant feeding product or bottle accessory that has been unsealed, including (but not limited to) breast pumps, bottles, </p></li> 
              <li><p>a beauty product or fragrance which has been used;</p></li> 
              <li><p>an intimate product, lingerie, swimwear, bodysuit, underwear or jewellery for piercings, which for hygienic and public health reasons may not be returned; or</p></li> 
              <li><p>a product which has been personalised for you or made to your specifications; or</p></li> 
              <li><p>a flatpack furniture product that has been assembled after delivery.</p></li>
              </ul>
              <p>We will collect the product from you at no charge. Once we have inspected the product and validated your return, we will credit your account with the purchase price of the product within 10 days of the return (or refund you if that is your preference).</p>

              <h4>Want to exchange?</h4>
              <p>Fashion and sportswear products can be exchanged for a different size or colour variation, provided that such variation is available. In such a case, we will collect the product from you and deliver the requested product to you at no charge. If such variation is not available, we will credit your account with the purchase price of the product within 10 days of the return (or refund you if that is your preference).</p>

              <h4>Not what you ordered?</h4>
              <p>If we accidentally deliver the wrong product to you, or if the product is not as described on the Website, please notify us and we will collect the product from you at no charge. If the product is missing any accessories or parts, you will need to follow the process set out in section 2 below. Once we have inspected the product and validated your return, we will at your choice deliver the correct product to you as soon as possible (if the correct product is available); or credit your account with the purchase price of the product within 10 days of the return (or refund you if that is your preference).</p>

              <h4>Products damaged on delivery</h4>
              <p>Should a product be damaged or missing any parts or accessories at the time of delivery / collection, please notify us within <strong>7 days </strong>of such delivery / collection by logging a return on the Website.
We will arrange to collect the product from you at no charge. Once we have inspected the product and validated your return, we will at your choice repair / replace the product as soon as possible (if such repair is possible/ we have the same product in stock to use as a replacement) or credit your account with the purchase price of the product (or refund you if that is your preference).
</p>

              <h4>Defective products</h4>
              <p>We do our best to ensure that the products we deliver to you are of a high quality,  and in good working order and without defects.</p>
              <p><strong>A defect is a material imperfection in the manufacture of a product or any characteristic of a product, which makes the product less acceptable than one would reasonably be entitled to expect in the circumstances.</strong></p>
              <p>The following will NOT be regarded as defects and will not entitle you to a return:</p>
              <ul>
              <li><p>faults resulting from normal wear and tear;</p></li> 
              <li><p>damage arising from negligence, user abuse or incorrect usage of the product;</p></li> 
              <li><p>damage arising from electrical surges or sea air corrosion;</p></li> 
              <li><p>damage arising from a failure to adequately care for the product;</p></li> 
              <li><p>damage arising from unauthorized alterations to the product;</p></li> 
              <li><p>where the specifications of a product, although accurately described on the Website and generally fit for its intended purpose, do not suit you.</p></li>
              </ul>
              <h4>Charges and refunds</h4>
              <h6>If you return a defective to us, but you fail to return all of the accessories and parts that were sold with that product, we are entitled to (subject to applicable law)  refuse the return,  or only to replace the item that you did return; or to estimate the value of the missing accessories and parts and to credit or refund you in respect of the returned item only.</h6>
              <p>If you return a product that does not comply with this Policy, you may be liable to reimburse Way4Biz for the cost of collecting the product from you and the cost of having the product returned to you.</p>
              <p><strong>Please note that we only refund to the payment method that you originally used –</strong> i.e. payment by credit card will be refunded to the same credit card, m-pesa payment to the same m-pesa account that made the payment.</p>
            </div>
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}

export default ReturnPolicy;
