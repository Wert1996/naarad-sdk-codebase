import axios from "axios";


export class NaaradAuthResource {
    constructor() {
        this.mock = false;
        this.baseUrl = "https://eh9tvxkypk.execute-api.us-east-1.amazonaws.com/dev/auth/"
    }

    createNewApiKey(walletPublicKey) {
        const url = this.baseUrl + "apiKey"
        const data = {
            "public_key": walletPublicKey
        }
        return axios.post(url, data)
    }

    getApiKeys(walletPublicKey) {
        const url = this.baseUrl + "apiKey?publicKey=" + walletPublicKey
        return axios.get(url)
    }
}