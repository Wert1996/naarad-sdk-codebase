import { useApiKeys } from "../../Hooks/ApiKeys"
import { useState } from "react"
import { useDapps } from "../../Hooks/Dapps"
import { NaaradDappResource } from "../../Resources/NaaradDappResource"
import "./ConfirmDelete.css"


const renderStatus = (requestWaiting, successMessage, errorMessage) => {
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

const deleteDapp = (event, name, deleteDappAction, apiKeys, setRequestWaiting, setSuccessMessage, setErrorMessage) => {
    event.stopPropagation()
    let selectedApiKey = apiKeys.apiKeyList[apiKeys.selected]["key"]
    if (selectedApiKey == null) {
        selectedApiKey = apiKeys.apiKeyList[apiKeys.selected]["api_key"]
    }
    setRequestWaiting(true)
    new NaaradDappResource().deleteDapp(selectedApiKey, name)
        .then((response) => {
            deleteDappAction(apiKeys.selected, response.data)
            setRequestWaiting(false)
            setSuccessMessage("Dapp successfully deleted.")
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

export const ConfirmDelete = (props) => {
    const dapp = props.dapp
    const name = dapp["dapp_name"]
    const {apiKeys, apiActions} = useApiKeys()
    const {dapps, dappActions} = useDapps()
    const [requestWaiting, setRequestWaiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    return (<div className="deleteBox" onClick={(event) => event.stopPropagation()}>
        <div className="alertBoxHeading" onClick={(event) => event.stopPropagation()}>Confirm Deletion</div>
        <div className="dialogDiv" onClick={(event) => event.stopPropagation()}>Are you sure you wish to delete dapp {name} ?</div>
        <div className="deleteButtonDiv" onClick={(event) => event.stopPropagation()}>
            <button onClick={(event) => deleteDapp(event, name, dappActions.deleteDapp, apiKeys, setRequestWaiting, setSuccessMessage, setErrorMessage)} className="deleteButton">Delete</button>
        </div>
        {renderStatus(requestWaiting, successMessage, errorMessage)}
    </div>)
}