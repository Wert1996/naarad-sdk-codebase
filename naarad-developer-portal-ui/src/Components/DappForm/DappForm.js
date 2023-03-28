import { useApiKeys } from "../../Hooks/ApiKeys"
import { NaaradDappResource } from "../../Resources/NaaradDappResource"
import "./DappForm.css"
import { useState } from "react"
import { useDapps } from "../../Hooks/Dapps"


const onDappCreationFormSubmit = (event, edit, apiKeys, dappName, dappPackageName, notificationConfig, setRequestWaiting, setSuccessMessage, setErrorMessage, appendDapp) => {
    event.preventDefault()
    setRequestWaiting(true)
    let selectedApiKey = apiKeys.apiKeyList[apiKeys.selected]["key"]
    if (selectedApiKey == null) {
        selectedApiKey = apiKeys.apiKeyList[apiKeys.selected]["api_key"]
    }
    const apiPromiseResponse = edit ? new NaaradDappResource().editDapp(selectedApiKey, dappName, notificationConfig): new NaaradDappResource().registerDapp(selectedApiKey, dappName, dappPackageName, notificationConfig)
    apiPromiseResponse.then((response) => {
            appendDapp(apiKeys.selected, response.data)
            setRequestWaiting(false)
            setSuccessMessage("Dapp successfully " + edit ? "edited.": "registered.")
            setErrorMessage(null)
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                setRequestWaiting(false)
                setSuccessMessage(null)
                setErrorMessage("Error response "+ error.response.status + " from server: " + error.response.data.message)
            } else if (error.request) {
                // The request was made but no response was received
                setRequestWaiting(false)
                setSuccessMessage(null)
                setErrorMessage("Did not receive response from server. " + error.message)
            } else {
                // Something happened in setting up the request that triggered an Error
                setRequestWaiting(false)
                setSuccessMessage(null)
                setErrorMessage(error.message)
            }
        })
}

const renderRegistrationStatus = (requestWaiting, successMessage, errorMessage) => {
    if (requestWaiting) {
        return (
        <div className="spinner-container">
            <div className="loading-spinner">
            </div><br/>Loading...
        </div>
        )
    }
    if (successMessage != null) {
        return <div className="status-message success-message">{"    Success: " + successMessage}</div>
    }
    else if (errorMessage != null) {
        return <div className="status-message error-message">{"    Error: " + errorMessage}</div>
    }
    else {
        return
    }
}

const onFormClick = (event) => {
    event.stopPropagation()
}

export const DappForm = (props) => {
    const edit = (props.edit == true)
    const dapp_to_edit = props.dapp
    const [dappName, setDappName] = useState(edit ? dapp_to_edit["dapp_name"]: "")
    const [packageName, setPackageName] = useState(edit ? dapp_to_edit["dapp_package_name"]: "")
    const [notificationConfig, setNotificationConfig] = useState(edit ? JSON.stringify(dapp_to_edit["notification_config"]): "")
    const [requestWaiting, setRequestWaiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const {apiKeys, apiActions} = useApiKeys()
    const {dapps, dappActions} = useDapps()
    return (
        <div>
        <div className="registration-box" onClick={(event) => onFormClick(event)}>
            <form>
            <div className="user-box">
                <input style={{cursor: (edit ? "not-allowed": "auto")}} title={edit ? "Immutable!": null} disabled={edit} value={dappName} type="text" name="dappName" onChange={(event) => setDappName(event.target.value)}/>
                <label>Name (unique id)</label>
            </div>
            <div className="user-box">
                <input style={{cursor: (edit ? "not-allowed": "auto")}} title={edit ? "Immutable!": null} disabled={edit} value={packageName} type="text" name="dappPackageName" onChange={(event) => setPackageName(event.target.value)}/>
                <label>Name of your android package</label>
            </div>
            <div className="user-box">
                <textarea value={notificationConfig} name="notificationConfig" rows="10" onChange={(event) => setNotificationConfig(event.target.value)}/>
                <label>Notification Config Json <a href="https://www.naaradsdk.click/docs">docs</a></label>
            </div>
            <a onClick={(event) => onDappCreationFormSubmit(event, edit, apiKeys, dappName, packageName, notificationConfig, setRequestWaiting, setSuccessMessage, setErrorMessage, dappActions.appendDapp)} style={{visibility: (requestWaiting ? 'hidden': 'visible')}}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {edit ? "Edit your Notification Config": "Register your App"}
            </a>
            </form>
            {renderRegistrationStatus(requestWaiting, successMessage, errorMessage)}
        </div>
        </div>
    )
}