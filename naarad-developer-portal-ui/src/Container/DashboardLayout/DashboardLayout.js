import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Outlet } from "react-router-dom"
import { NavBar } from "../DashSideNavBar/DashSideNavBar"
import naaradLogo from "../../Assets/Images/naaradLogo.png"
import "./DashboardLayout.css"

export const DashboardLayout = () => {
    return (
        <div className="god-div">
            <div className="dashboard-header-div">
                <table className="header-table">
                    <tr>
                        <td><a href="https://www.naaradsdk.click" target="_blank"><img className="naaradLogoImg" src={naaradLogo} /></a></td>
                        <td><WalletMultiButton /></td>
                    </tr>
                </table>
            </div>
            <div className="dashboard-title-div"><p>Naarad SDK Developer Portal</p></div>
            <div className="dashboard-container-div">
                <NavBar />
                <div className="outlet-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}