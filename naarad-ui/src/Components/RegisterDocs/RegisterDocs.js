import React from "react";
import { Link } from "react-router-dom";

export class RegisterDocs extends React.Component {
    render() {
        return (<div>
            <div className="docHeading">
                Registering your dApp
            </div>
            <div className="docContent">
                <b>NOTE: You can perform the below steps, or easier, you can head to the <a href="https://dev.naaradsdk.click" target="_blank">DEVELOPER PORTAL</a> and manage your API keys, dApps and track your usage.</b>
                <br/><br/><b>For registering, an API key is required. Contact @wert#9273 on Discord in order to request an API key.</b>
                <br></br><br></br>
                You will need to register your mobile application in order to start receiving push notifications from Naarad.
                <br/>In order to register, go to the <Link to="/getting_started">Getting Started</Link> page and complete the Registration step.
                <br/><br/>
                You will need an API key, dApp name, and a <b>Notification config</b>, which defines which on chain activities should be sent as notifications, and other custom data.
            </div>
        </div>)
    }
}