import naaradLogo from "../../Assets/Images/naaradLogo.png"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import "./ConnectPage.css";

require('@solana/wallet-adapter-react-ui/styles.css');

export class ConnectPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="header-div">
                <div className="connectWalletButton"><WalletMultiButton /></div>
                </div>
                <div className="main-div">
                    <div className="heading-div">
                        <div className="title-1">Naarad</div>
                        <div className="title-2">SDK</div>
                    </div>
                    <div className="messageContainerDiv">
                        <div className="naaradLogoDiv"><img className={"intro-logo"} src={naaradLogo} alt="" data-image-width="500" data-image-height="500"/></div>
                        <div className="sideMessageDiv">
                            <div className="connectMessageDiv">
                                <div className="welcome">Welcome to the Naarad SDK developer portal.</div>
                                <div className="connect">Connect your Solana wallet to access your developer portal dashboard.</div>
                                
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        )
    }
}