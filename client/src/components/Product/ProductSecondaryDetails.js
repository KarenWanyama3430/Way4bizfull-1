import React from "react";
import Tabs from "react-responsive-tabs";

import "./ProductSecondaryDetails.css";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";

class ProductSecondaryDetails extends React.Component {
  state = {
    productTabs: [
      {
        name: "Product Details",
        data: <ProductDetails data={this.props.details} />
      },
      {
        name: "Customer Reviews",
        data: <ProductReviews />
      }
    ]
  };

  getTabs = () => {
    let { productTabs } = this.state;
    return productTabs.map((productTab, index) => ({
      title: productTab.name,
      getContent: () => productTab.data,
      key: index,
      tabClassName: "tab",
      panelClassName: "product-panel"
    }));
  };
  render() {
    return (
      <div>
        <Tabs
          items={this.getTabs()}
          transformWidth={540}
          transform={true}
          showMoreLabel={"More..."}
          showInkBar={true}
        />
      </div>
    );
  }
}

export default ProductSecondaryDetails;
