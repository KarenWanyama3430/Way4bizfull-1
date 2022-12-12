import React from "react";

import "./MiniMenuWrapper.css";

import MiniMenu from "./MiniMenu";


class MiniMenuWrapper extends React.Component {
    render(){
        return (
            <div id="mini-menu-wrapper">
                <MiniMenu/>
            </div>
        )
    }
}


export default MiniMenuWrapper