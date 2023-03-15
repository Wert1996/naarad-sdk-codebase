import React from "react";
import { Introduction } from "../../Components/IntroductionDocs/Introduction";
import { NotificationConfigDocs } from "../../Components/NotificationConfigDocs/NotificationConfigDocs";
import { SetupDocs } from "../../Components/SetupDocs/SetupDocs";
import { RegisterDocs } from "../../Components/RegisterDocs/RegisterDocs";
import { CustomNotificationDocs } from "../../Components/CustomNotificationDocs/CustomNotificationDocs";
import "./DocsPage.css"

export class DocsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "intro"
        }
        this.docMapping = {
            "intro": <Introduction/>,
            "setup": <SetupDocs/>,
            "register": <RegisterDocs/>,
            "config": <NotificationConfigDocs/>,
            "customNot": <CustomNotificationDocs/>
        }
    }
    
    onSelect(content_name) {
        this.setState({
            selected: content_name
        })
    }

    isSelected(content_name) {
        return this.state.selected == content_name
    }

    componentDidMount() {
        this.appendScript("Scripts/jquery.js")
        this.appendScript("Scripts/nicepage.js")
      }
    
    appendScript(scriptUrl) {
        const script = document.createElement("script");

        script.src = scriptUrl;
        script.async = true;

        document.head.appendChild(script);
    } 

    render() {
        return (
            <div className="docs-container">
                <section className="heading-container">
                    <p>Documentation</p>
                </section>
                <div className="flex-container-main">

                    <section className="sidebar">
                        <div className="sidebar-element sidebar-heading" style={{fontWeight: "100px"}}>Table of Contents</div>
                        <div onClick={() => this.onSelect("intro")} className={"sidebar-element sidebar-item" + (this.isSelected("intro") ? " selected": "")}>Introduction</div>
                        <div onClick={() => this.onSelect("setup")} className={"sidebar-element sidebar-item" + (this.isSelected("setup") ? " selected": "")}>Setting up</div>
                        <div onClick={() => this.onSelect("register")} className={"sidebar-element sidebar-item" + (this.isSelected("register") ? " selected": "")}>Registering your dApp</div>
                        <div onClick={() => this.onSelect("config")} className={"sidebar-element sidebar-item" + (this.isSelected("config") ? " selected": "")}>Writing a notification config</div>
                        <div onClick={() => this.onSelect("customNot")} className={"sidebar-element sidebar-item" + (this.isSelected("customNot") ? " selected": "")}>Sending custom notifications</div>
                    </section>

                    <section className="content">
                        {this.docMapping[this.state.selected]}
                    </section>

                </div>
            </div>   
        )
    }
}