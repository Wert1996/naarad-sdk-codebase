import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect, useMemo } from "react";
import { makeObservable } from "../Observable/Observable";

const apiKeysStore = makeObservable({ apiKeyList: null, selected: null, publicKey: null });

export const useApiKeys = () => {

    const { publicKey } = useWallet()

    const [apiKeys, setApiKeys] = useState(apiKeysStore.get());

    useEffect(() => {
        return apiKeysStore.subscribe(setApiKeys);
    }, []);

    useEffect(() => {
        if (apiKeys.publicKey != publicKey) {
            apiKeysStore.set({ apiKeyList: null, selected: null, publicKey: publicKey })
        }
    }, [])

    const actions = useMemo(() => {
        return {
            setSelected: (selected) => apiKeysStore.set({...apiKeys, selected}),
            setApiKeyList: (apiKeyList) => apiKeysStore.set({...apiKeys, apiKeyList})
        }
    }, [apiKeys])

    return {
        apiKeys,
        actions
    }
}
