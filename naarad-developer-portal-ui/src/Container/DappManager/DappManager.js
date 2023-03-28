import { useDapps } from "../../Hooks/Dapps"
import { useApiKeys } from "../../Hooks/ApiKeys"
import { useState, useEffect } from "react"
import "./DappManager.css"
import { NaaradDappResource } from "../../Resources/NaaradDappResource"
import { DappForm } from "../../Components/DappForm/DappForm"
import editIcon from "../../Assets/Images/edit-icon.png"
import deleteIcon from "../../Assets/Images/delete-icon.png"
import { ConfirmDelete } from "../../Components/ConfirmDeletion/ConfirmDelete"

export const DappManager = () => {
    return (
        <Template>
            <Content />
        </Template>
    )
}

const retrieveDappList = (apiKeys, setDappList, setErrorMessage) => {
    const selectedApiKey = apiKeys.apiKeyList[apiKeys.selected]
    const apiKeyString = selectedApiKey["key"] ? selectedApiKey["key"]: selectedApiKey["api_key"]
    new NaaradDappResource().listDapps(apiKeyString)
        .then((response) => {
            setDappList(apiKeys.selected, response.data)
            setErrorMessage(null)
        })
        .catch((error) => {
            if (error.response) {
                setErrorMessage("Could not retrieve Dapp list. Response "+ error.response.status + " from server: " + error.response.data.message)
            } else if (error.request) {
                setErrorMessage("Could not retrieve Dapp list. Did not receive response from server.")
            }
            else {
                setErrorMessage("Could not retrieve Dapp list. " + error.message)
            }
        })
}

const showCreateDappForm = (setToShowForm) => {
    return (
        <div className="dappformContainerDiv" onClick={() => setToShowForm(false)}>
            <DappForm />
        </div>
    )
}

const showEditForm = (dapp, setToShowEditForm) => {
    return (
        <div className="dappformContainerDiv" onClick={() => setToShowEditForm(null)}>
            <DappForm dapp={dapp} edit={true}/>
        </div>
    )
}

const showDeleteBox = (dapp, setToShowDeleteBox) => {
    return (
        <div className="dappformContainerDiv" onClick={() => setToShowDeleteBox(null)}>
            <ConfirmDelete dapp={dapp} />
        </div>
    )
}

const getDappRows = (dappList, setToShowEditForm, setToShowDeleteBox) => {
    let dappRows = []
    for (let i=0;i<dappList.length;i++) {
        dappRows.push(
            <tr className={i%2 == 0 ? "redrow": "whiterow"}>
                <td>{dappList[i].dapp_name}</td>
                <td>{dappList[i].dapp_package_name}</td>
                <td>{new Date(parseInt(dappList[i].created_on)*1000).toLocaleString()}</td>
                <td>{JSON.stringify(dappList[i].notification_config).slice(0, 7) + "..."}</td>
                <td><img onClick={() => setToShowEditForm(i)} title="Edit" className="dappActionImg" src={editIcon}/><img onClick={() => setToShowDeleteBox(i)} title="Delete" className="dappActionImg" src={deleteIcon}/></td>
            </tr>
        )
    }
    return dappRows
}

const getDappTable = (dappList, toShowEditForm, setToShowEditForm, toShowDeleteBox, setToShowDeleteBox) => {
    return (
        <div>
            <div className="apiKeyTableDiv">
                <table className="apiKeyTable">
                        <tr>
                            <th>Name</th>
                            <th>Package name</th>
                            <th>Created on</th>
                            <th>Notification Config</th>
                            <th>Actions</th>
                        </tr>
                        {getDappRows(dappList, setToShowEditForm, setToShowDeleteBox)}
                </table>
            </div>
            {toShowEditForm == null? null: showEditForm(dappList[toShowEditForm], setToShowEditForm)}
            {toShowDeleteBox == null? null: showDeleteBox(dappList[toShowDeleteBox], setToShowDeleteBox)}
        </div>
    )
}
const showNoDappsMessage = (toShowForm, setToShowForm) => {
    
    return (
        <div>
            <div className="noKeyMessage">You do not have any dApps configured for this API key. Use the button below to create one!</div>
            <button onClick={() => setToShowForm(!toShowForm)} className="button-85" role="button"><table><tr><td><span style={{fontSize: "40px", marginRight: "20px"}}>&#43;</span>     </td><td>Create new dApp</td></tr></table></button>
            {toShowForm ? showCreateDappForm(setToShowForm): null}
        </div>
    )
}

const Content = () => {
    const { apiKeys, apiKeyActions } = useApiKeys()
    const { dapps, dappActions } = useDapps()
    const [errorMessage, setErrorMessage] = useState(null)
    const [toShowForm, setToShowForm] = useState(false)
    const [toShowEditForm, setToShowEditForm] = useState(null)
    const [toShowDeleteBox, setToShowDeleteBox] = useState(null)

    useEffect(() => {
        if (apiKeys.selected != null && dapps.dappMap[apiKeys.selected] == null) {
            retrieveDappList(apiKeys, dappActions.setDappList, setErrorMessage)
        }
    }, [])
    if ( apiKeys.selected == null ) {
        return (
            <div className="noKeyMessage">
                No API key has been selected. Please go to the API keys section and select an API key!
            </div>
        )
    }
    const dAppList = dapps.dappMap[apiKeys.selected]
    return (
        <div>
            {
                (dAppList == null || dAppList.length == 0) ? showNoDappsMessage(toShowForm, setToShowForm): getDappTable(dAppList, toShowEditForm, setToShowEditForm, toShowDeleteBox, setToShowDeleteBox)
            }
            {
                errorMessage != null ?
                <div className="error-message-div"><span style={{marginLeft: "26px"}}>{ "Error: " + errorMessage }</span></div>
                : null
            }
        </div>
    )
}

const Template = ({ children }) => {
    return (
        <div>
            <div className="outletSubHeading">Your dApps</div>
            { children }
        </div>
    )
}
