import { Link } from "react-router-dom"
import { useState } from "react"
import "./DashSideNavBar.css"


export const NavBar = (props) => {
    const [selected, setSelected] = useState("key")
    return (
        <div className="sideBarContainer">
            <div className="sideBarItem"></div>
            <Link style ={{textDecoration: 'none'}} to="/"><div onClick={()=> setSelected("key")} className={"sideBarItem" + (selected == "key" ? " selected": "")}>API Keys</div></Link>
            <Link style ={{textDecoration: 'none'}} to="dapps"><div onClick={()=> setSelected("dapp")} className={"sideBarItem" + (selected == "dapp" ? " selected": "")}>Manage Your Apps</div></Link>
            <Link style ={{textDecoration: 'none'}} to="tracker"><div onClick={()=> setSelected("track")} className={"sideBarItem" + (selected == "track" ? " selected": "")}>Usage Tracker</div></Link>
            <a href="https://www.naaradsdk.click/docs" target="_blank"><div className="goDocsDiv">Documentation</div></a>
        </div>
    )
}