import axios from "axios";


export class NaaradDappResource {
    constructor() {
        this.mock = false;
        this.baseUrl = "https://eh9tvxkypk.execute-api.us-east-1.amazonaws.com/dev/dapp/"
    }

    registerDapp(apiKey, dAppName, dAppPackageName, notificationConfig) {
        if ( apiKey == null || dAppName == null || dAppPackageName == null || apiKey == "" || dAppName == "" || dAppPackageName == "") {
            return new Promise((resolve, reject) => {
                throw new Error("Api key, dApp name and dApp package name are required parameters.");
              });
        }
        const data = {
            "dapp_name": dAppName,
            "dapp_package_name": dAppPackageName,
            "notification_config": notificationConfig
        }
        const headers = {
            "Authorization": "Basic " + apiKey
        }
        return axios.post(this.baseUrl, data, {headers: headers})
    }
    
    listDapps(apiKey) {
        if ( apiKey == null ) {
            return new Promise((resolve, reject) => {
                throw new Error("Api key cannot be null")
            })
        }
        const headers = {
            "Authorization": "Basic " + apiKey
        }
        return axios.get(this.baseUrl, {headers: headers})
    }
    
    editDapp(apiKey, dappName, notificationConfig) {
        if (apiKey == null || dappName == null || notificationConfig == null) {
            return new Promise((resolve, reject) => {
                throw new Error("Api key, dapp name or notification config were provided as null during edit.")
            })
        }
        const url = this.baseUrl + "?name=" + dappName
        const headers = {
            "Authorization": "Basic " + apiKey
        }
        const data = {
            "notification_config": notificationConfig
        }
        return axios.put(url, data, {headers: headers})
    }

    deleteDapp(apiKey, dappName) {
        if (apiKey == null || dappName == null) {
            return new Promise((resolve, reject) => {
                throw new Error("Api key or dapp name were provided as null during deletion.")
            })
        }
        const url = this.baseUrl + "?name=" + dappName
        const headers = {
            "Authorization": "Basic " + apiKey
        }
        return axios.delete(url, {headers: headers})
    }
}