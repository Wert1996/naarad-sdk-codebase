import React from "react";

export class CustomNotificationDocs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="docHeading">
                    Custom Notifications
                </div>
                <div className="docContent">
                    <p>Naarad allows custom triggers for notifications. What this means is that apart from blockchain triggers, developers can use the API to send notifications to their app users. To set up custom notifications, add your own event type in the notification config for your dApp. Once that is done, create a <code>POST</code> request with the following parameters:</p>
                    <code>Url: https://eh9tvxkypk.execute-api.us-east-1.amazonaws.com/dev</code><br/><br/>
                    <code>{"Headers: {'Authorization': ''}"}</code> (add valid API key here)<br/><br/>
                    <code>{"Body : [{'type': '<configured_event_type>'}]"}</code> ( Follow the Helius event format for the body here )
                    <br/><br/><br/>
                </div>
            </div>
        )
    }
}