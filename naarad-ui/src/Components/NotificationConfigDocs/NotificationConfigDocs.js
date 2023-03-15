import React from "react";

const code_1 = "{\n   \"<CHAIN_EVENT_TYPE_1>\": DATA_1(dict)\n   \"<CHAIN_EVENT_TYPE_2>\": DATA_2(dict)\n}"

export class NotificationConfigDocs extends React.Component {
    componentDidMount() {
        this.appendScript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js")
    }

    appendScript(scriptUrl) {
        const script = document.createElement("script");
    
        script.src = scriptUrl;
        script.async = true;
    
        document.head.appendChild(script);
    } 

    
    render() {
        return (<div>
            <div className="docHeading">
                Notification Configuration
            </div>
            <div className="docContent">
                <p>A notification config tells Naarad how on chain triggers need to be handled.
                <br/>An empty notification config denotes that on chain triggers are to be ignored, and not to be forwarded as push notifications.
                </p>
            </div>
            <div className="docSubHeading">
                What does it look like ?
            </div>
            <div className="docContent">
                Below json describes the schema of a notification config.
                <pre className="prettyprint">{code_1}</pre>
                On a chain event, Naarad would interpret the accound IDs involved, and would send over the chain event data, along with the data in <code>DATA_1</code> to the device registered with that account ID. 
                <br/>The parsed transaction data would be sent in a field called <code>data</code>. The data in the notification config would be sent in a field called <code>extra_data</code>.
                To find what are the chain event types, and which ones are suited for your dApp, refer to the Helius documentation <a href="https://docs.helius.xyz/reference/transaction-types#transaction-types">here</a>. 
            </div>
        </div>)
    }
}