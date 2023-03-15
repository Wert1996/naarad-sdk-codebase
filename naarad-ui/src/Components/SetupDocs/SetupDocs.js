import React from "react";
import "../../Assets/Styles/Desert.css"

const code_1 = "allprojects {\n  repositories {\n    maven { url 'https://jitpack.io' }\n  }\n}"
const code_2 = "dependencies {\n  .....\n  implementation 'com.github.Wert1996:Naarad-kotlin-sdk:main-SNAPSHOT'\n  implementation 'com.google.firebase:firebase-messaging-ktx:23.1.2'\n}"
const code_3 = "<service\n  android:name=\".java.NotificationHandlerService\"\n  android:exported=\"false\">\n  <intent-filter>\n    <action android:name=\"com.google.firebase.MESSAGING_EVENT\" />\n  </intent-filter>\n</service>"
const code_4 = "import com.naarad.sdk.auth.NaaradAuth\n   .......\n   NaaradAuth(context, dappName, apiKey, walletAddress).initialiseApp()\n   ...."

export class SetupDocs extends React.Component {
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
                Add Naarad to your Android app
            </div>
            <div className="docContent">
                <b>Note: Naarad only supports Android applications as of now!</b>
                <br/>
                <br></br>
                Once an app is successfully registered, a few application changes are required for integration to be complete. Below steps assume you have an Android application setup locally with the registered package name.
            </div>
            <div className="docSubHeading">
                Add Naarad SDK to your app
            </div>
            <div className="docContent">
                In your <b>project's build.gradle file</b>, add the following line:
                <pre className="prettyprint">
                    {code_1}
                </pre> 
                In your <b>module (app-level) Gradle file</b>, add the dependencies for the Naarad SDK.
                <pre className="prettyprint">{code_2}
                </pre>
                <br/> Do not forget to sync your project files.
            </div>
            <div className="docSubHeading">
                Initialise Naarad on your app
            </div>
            <div className="docContent">
                On successful initialisation, the device running your app should recieve push notifications as configured. Use the following code to initialise Naarad on your app.
                <pre className="prettyprint">{code_4}</pre>
                In the above code, the initialisation requires your API key, registered dApp name and the wallet address you wish to associate the current device with.<br/>
                If successful, on chain activities for the wallet address provided should be sent as push notifications (as configured in the notification config), and displayed in the notification tray.
            </div>
            <div className="docSubHeading">
                Customize your notifications
            </div>
            <div className="docContent">
                Add a service that extends <code>NaaradMessagingService</code>. You would be able to add custom code for handling messages through this service.
                <pre className="prettyprint">{code_3}</pre>
                You can now extend the <code>NaaradMessagingService</code> and add your custom code for handling notifications.<br/>
                To build your custom notification, override the method <code>buildNotification(remoteMessage: NaaradRemoteMessage): NotificationCompat.Builder</code><br/> Return a custom notification object from the above method.
            </div>
        </div>)
    }
}