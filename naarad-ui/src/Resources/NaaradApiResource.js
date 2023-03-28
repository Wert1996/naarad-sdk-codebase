import axios from "axios"

export class NaaradApiResource {
    constructor() {
        this.mock = false
        this.baseUrl = "https://eh9tvxkypk.execute-api.us-east-1.amazonaws.com/dev/"
    }

    registerDapp(apiKey, dAppName, dAppPackageName, notificationConfig) {
        if ( apiKey == null || dAppName == null || dAppPackageName == null || apiKey == "" || dAppName == "" || dAppPackageName == "") {
            return new Promise((resolve, reject) => {
                throw new Error("Api key, dApp name and dApp package name are required parameters.");
              });
        }
        const dappResourceUrl = this.baseUrl + "dapp/"
        const data = {
            "dapp_name": dAppName,
            "dapp_package_name": dAppPackageName,
            "notification_config": notificationConfig
        }
        const headers = {
            "Authorization": "Basic " + apiKey
        }
        return axios.post(dappResourceUrl, data, {headers: headers})
    }
}