import React from "react";
import { NaaradApiResource } from "../../Resources/NaaradApiResource";
import "./RegistrationForm.css"


export class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: "",
            dappName: "",
            dappPackageName: "",
            notificationConfig: "",
            registrationRequestWaiting: false,
            errorMessage: null,
            successMessage: null
        }
    }

    onDappRegistrationFormSubmit(event) {
        event.preventDefault()
        this.setState({
          registrationRequestWaiting: true
        })
        new NaaradApiResource().registerDapp(this.state.apiKey, this.state.dappName, this.state.dappPackageName, this.state.notificationConfig)
          .then((response) => {
            console.log(response.data)
            this.setState({
              registrationRequestWaiting: false,
              successMessage: "Dapp successfully registered.",
              errorMessage: null
            })
          }).catch((error) => {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                this.setState({
                    registrationRequestWaiting: false,
                    errorMessage: "Response "+ error.response.status + " from server: " + error.response.data.message,
                    successMessage: null
                  })
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                this.setState({
                    registrationRequestWaiting: false,
                    errorMessage: "Did not receive response from server.",
                    successMessage: null
                  })
              } else {
                // Something happened in setting up the request that triggered an Error
                this.setState({
                    registrationRequestWaiting: false,
                    errorMessage: error.message,
                    successMessage: null
                  })
              }
          })
    }
  
    onFormValuesChange(event) {
        const name = event.target.name;
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }

    renderRegistrationStatus() {
        if (this.state.registrationRequestWaiting) {
            return (
            <div className="spinner-container">
                <div className="loading-spinner">
                </div><br/>Loading...
            </div>
            )
        }
        if (this.state.successMessage != null) {
            return <div className="status-message success-message">Success: {this.state.successMessage}</div>
        }
        else if (this.state.errorMessage != null) {
            return <div className="status-message error-message">Error: {this.state.errorMessage}</div>
        }
        else {
            return
        }
    }
    
    render() {
        return (
            <div>
            <div className="registration-box">
                <form>
                <div className="user-box">
                    <input value={this.state.apiKey} type="password" name="apiKey" onChange={(event) => this.onFormValuesChange(event)}/>
                    <label>API Key:</label>
                </div>
                <div className="user-box">
                    <input value={this.state.dappName} type="text" name="dappName" onChange={(event) => this.onFormValuesChange(event)}/>
                    <label>dApp Name (unique identifier):</label>
                </div>
                <div className="user-box">
                    <input value={this.state.dappPackageName} type="text" name="dappPackageName" onChange={(event) => this.onFormValuesChange(event)}/>
                    <label>dApp Package Name (package name of your android app):</label>
                </div>
                <div className="user-box">
                    <textarea value={this.state.notificationConfig} name="notificationConfig" rows="10" onChange={(event) => this.onFormValuesChange(event)}/>
                    <label>Notification Config Json:</label>
                </div>
                <a onClick={(event)=>this.onDappRegistrationFormSubmit(event)} style={{visibility: (this.state.registrationRequestWaiting ? 'hidden': 'visible')}}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Register your App
                </a>
                </form>
                {this.renderRegistrationStatus()}
            </div>
            </div>
        )
    }
}