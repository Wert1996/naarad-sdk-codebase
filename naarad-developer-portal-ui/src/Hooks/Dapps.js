import { useState, useEffect, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { makeObservable } from "../Observable/Observable";


const dappStore = makeObservable({ dappMap: {} , publicKey: null});

export const useDapps = () => {
    
    const { publicKey } = useWallet()
    
    const [dapps, setDapps] = useState(dappStore.get())
    
    useEffect(() => {
        return dappStore.subscribe(setDapps);
    }, []);

    useEffect(() => {
        if (dapps.publicKey != publicKey) {
            dappStore.set({ dappMap: {}, publicKey: publicKey })
        }
    }, [])

    const dappActions = useMemo(() => {
        return {
            setDappMap: (dappMap) => {
                dappStore.set({...dapps, dappMap})
            },
            setDappList: (apiKeyIndex, dappList) => {
                let dappMap = dapps.dappMap
                dappMap[apiKeyIndex] = dappList
                dappStore.set({...dapps, dappMap})
            },
            appendDapp: (apiKeyIndex, newDapp) => {
                let dappMap = dapps.dappMap
                let dappList = dappMap[apiKeyIndex]
                let flag = null
                for (let i=0;i<dappList.length;i++) {
                    if (dappList[i]["dapp_name"] == newDapp["dapp_name"]){
                        flag = i
                    }
                }
                if (flag == null) {
                    dappList.push(newDapp)
                }
                else {
                    dappList[flag] = newDapp
                }
                dappMap[apiKeyIndex] = dappList
                dappStore.set({...dapps, dappMap})
            },
            deleteDapp: (apiKeyIndex, dappName) => {
                let dappMap = dapps.dappMap
                let dappList = dappMap[apiKeyIndex]
                let flag = null
                for (let i=0;i<dappList.length;i++) {
                    if (dappList[i]["dapp_name"] == dappName){
                        flag = i
                    }
                }
                dappList.splice(flag, 1)
                dappMap[apiKeyIndex] = dappList
                dappStore.set({...dapps, dappMap})
            }
        }
    }, [dapps])

    return {
        dapps,
        dappActions
    }
}