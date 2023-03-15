import React from "react";

export class Introduction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="docHeading">
                    Introduction
                </div>
                <div className="docContent">
                    <b>Note: This SDK currently only supports Android apps, and the Solana blockchain!</b>
                    <br/><br/>
                    <p>This SDK is meant to be used by dApp developers for easily enabling push notifications into their dApps for blockchain triggers. However, it can also be used as a general purpose push notifications service.</p>
                </div>
                <div className="docSubHeading">
                    As a developer, what can I expect ?
                </div>
                <div className="docContent">
                    <p>This is meant to be integrated into your existing dApp. Once setup, the mobile device running the application should receive push notifications, based on the config provided by you.</p>
                </div>
                <div className="docSubHeading">
                    What is the Notification config ?
                </div>
                <div className="docContent">
                    <p>The notification config defines which on chain activities should your dApp be notified about, and what data needs to be sent for each such activity.</p>
                    Head over to the <b>Writing a notification config</b> section in this documentation to learn more about it.
                </div>
            </div>
        )
    }
}