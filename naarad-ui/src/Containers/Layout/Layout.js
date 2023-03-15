import { Outlet } from "react-router-dom";
import React from "react";
import { NavBar } from "../NavBar/NavBar";
import Footer from "../Footer/Footer"
// import styles from "../../Assets/Styles/Common.module.css"
import "../../Assets/Styles/Common.css"

export class Layout extends React.Component {
    componentDidMount() {
        // this.appendScript("Scripts/jquery.js")
        // this.appendScript("Scripts/nicepage.js")
      }
    
      appendScript(scriptUrl) {
        const script = document.createElement("script");
    
        script.src = scriptUrl;
        script.async = true;
    
        document.head.appendChild(script);
      } 

    render() {

        return (
            <div className={'u-body' + ' u-xl-mode'} style={{fontSize: "16px"}} data-lang="en">
                <NavBar />
                <Outlet />
                <Footer />
            </div>
        )
    }
}
