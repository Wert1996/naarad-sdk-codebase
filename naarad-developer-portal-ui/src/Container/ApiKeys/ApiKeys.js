import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useApiKeys } from "../../Hooks/ApiKeys"
import { NaaradAuthResource } from "../../Resources/NaaradAuthResource"
import "./ApiKeys.css"


const onApiKeyToggle = (toggled_num, currently_selected, setSelected) => {
    console.log(currently_selected)
    console.log(toggled_num)
    if (currently_selected == toggled_num) {
        setSelected(null)
        return
    }
    setSelected(toggled_num)
}

const getApiKeyRows = (apiKeys, setSelected) => {
    const apiKeyList = apiKeys.apiKeyList
    let apiKeyRows = []
    for (let i=0;i<apiKeyList.length;i++) {
        apiKeyRows.push(
            <tr className={i%2 == 0 ? "redrow": "whiterow"}>
                <td>{apiKeyList[i].key ? apiKeyList[i].key: apiKeyList[i].api_key}</td>
                <td>{new Date(parseInt(apiKeyList[i].created_on)*1000).toLocaleString()}</td>
                {/* <td>{apiKeyList[i].created_on}</td> */}
                <td>{apiKeyList[i].status}</td>
                <td><label className="switch"><input checked={apiKeys.selected == i} type="checkbox" onChange={() => onApiKeyToggle(i, apiKeys.selected, setSelected) } /><span className="slider"></span></label></td>
            </tr>
        )
    }
    return apiKeyRows;
}

const getApiKeysTable = (apiKeys, setSelected) => {
    return (
        <div className="apiKeyTableDiv">
            <table className="apiKeyTable">
                    <tr>
                        <th>API Key</th>
                        <th>Created on</th>
                        <th>Status</th>
                        <th>Selected</th>
                    </tr>
                    {getApiKeyRows(apiKeys, setSelected)}
            </table>
            </div>
    )
}

const createNewApiKey = (publicKey, setApiKeys, setErrorMessage) => {
    if (!publicKey) {
        console.log("Unexpected error! Could not get wallet public key of user.")
    }
    new NaaradAuthResource().createNewApiKey(publicKey)
        .then((response) => {
            setApiKeys(response.data["api_keys"])
            setErrorMessage(null)
        }).catch((error) => {
            if (error.response) {
                setErrorMessage("Could not create new API Key. Response "+ error.response.status + " from server: " + error.response.data.message)
            } else if (error.request) {
                setErrorMessage("Could not create new API Key. Did not receive response from server.")
            }
            else {
                setErrorMessage("Could not create new API Key. " + error.message)
            }
        })
}

const getCreateApiKeyview = (publicKey, setApiKeys, setErrorMessage) => {
    return (
        <div>
            <div className="noKeyMessage">You do not have any API keys set for this wallet!</div>
            {/* <div className="newKeyButtonDiv">&#43; Create new API Key</div> */}
            <button onClick={() => createNewApiKey(publicKey, setApiKeys, setErrorMessage)} className="button-85" role="button"><table><tr><td><span style={{fontSize: "40px", marginRight: "20px"}}>&#43;</span>     </td><td>Create new API Key</td></tr></table></button>
        </div>
    )
}

const getExistingApiKeys = (publicKey, setApiKeys, setErrorMessage) => {
    new NaaradAuthResource().getApiKeys(publicKey)
        .then((response) => {
            setApiKeys(response.data["api_keys"])
            setErrorMessage(null)
        })
        .catch((error) => {
            setApiKeys([])
            if (error.response) {
                setErrorMessage("Could not retrieve API keys. Response "+ error.response.status + " from server: " + error.response.data.message)
            } else if (error.request) {
                setErrorMessage("Could not retrieve API keys. Did not receive response from server.")
            }
            else {
                setErrorMessage("Could not retrieve API keys. " + error.message)
            }
        })
}

export const ApiKeys = () => {
    const { publicKey } = useWallet()
    const [errorMessage, setErrorMessage] = useState(null)
    const {apiKeys, actions} = useApiKeys()
    useEffect(() => {
        if ( !apiKeys.apiKeyList ) {
            getExistingApiKeys(publicKey, actions.setApiKeyList, setErrorMessage)
        }
    }, [])
    return (<div>
        <div className="outletSubHeading">Your API Keys</div>
            {(!apiKeys.apiKeyList || apiKeys.apiKeyList.length == 0) ? getCreateApiKeyview(publicKey, actions.setApiKeyList, setErrorMessage) : getApiKeysTable(apiKeys, actions.setSelected)}
            {
                errorMessage != null ?
                <div className="error-message-div"><span style={{marginLeft: "26px"}}>{ "Error: " + errorMessage }</span></div>
                : null
            }
    </div>)
}