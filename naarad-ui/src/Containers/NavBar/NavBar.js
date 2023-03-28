import React from "react";
import naaradLogo from "../../Assets/Images/naaradLogo.png"
import { Link } from "react-router-dom"
import "./NavBar.css"

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleCollapsibleMenu.bind(this)
        this.state = {
          "collapsible_menu": false
        }
    }

    componentDidMount() {
      // this.appendScript("Scripts/jquery.js")
      // this.appendScript("Scripts/nicepage.js")
    }
  
    appendScript(scriptUrl) {
      const script = document.createElement("script");
  
      script.src = scriptUrl;
      script.async = true;
  
      document.head.appendChild(script);
    } 

    toggleCollapsibleMenu() {
      const currentState = this.state["collapsible_menu"]
      this.setState({
        collapsible_menu: currentState ? 0 : 1
      })
    }

    render() {
        return (
            <div className={'u-clearfix' + ' u-header' + ' u-header'} id="sec-bd52"><div className={'u-clearfix' + ' u-sheet' + ' u-sheet-1'}>
        {/* <a href="https://nicepage.com" className={'u-image' + ' u-logo' + ' u-image-1'} data-image-width="500" data-image-height="500"> */}
        <Link to="/" className={'u-image' + ' u-logo' + ' u-image-1'} data-image-width="500" data-image-height="500">
          <img src={naaradLogo} className={'u-logo-image' + ' u-logo-image-1'} alt="Could not load logo"/>
        {/* </a> */}
        </Link>
        <nav className={'u-menu' + ' u-menu-one-level' + ' u-offcanvas' + ' u-menu-1'}>
          <div className={'menu-collapse'} style={{fontSize: "1rem", letterSpacing: "0px"}}> *
            <div onClick={() => this.toggleCollapsibleMenu()} className={'u-button-style' + ' u-custom-left-right-menu-spacing' + ' u-custom-padding-bottom' + ' u-custom-top-bottom-menu-spacing' + ' u-nav-link' + ' u-palette-2-base' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base' + ' clickable-collapse-div'} href="#">
              <svg className={'u-svg-link'} viewBox="0 0 24 24"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#menu-hamburger"></use></svg>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><symbol id="menu-hamburger" viewBox="0 0 16 16" style={{width: "16px", height: "16px"}}><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
                </symbol>
                </defs></svg>
            </div>
          </div>
          <div className={'u-custom-menu' + ' u-nav-container'}>
            <ul className={'u-nav' + ' u-unstyled' + ' u-nav-1'}><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} to="/" style={{padding: "10px 20px"}}>Home</Link>
            </li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} to="getting_started" style={{padding: "10px 20px"}}>Get Started</Link>
            </li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} to="docs" style={{padding: "10px 20px"}}>Docs</Link>
            </li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} to="contact" style={{padding: "10px 20px"}}>Contact</Link>
            </li><li className={'u-nav-item'}><a href="https://dev.naaradsdk.click"><button className="devPortalButton">DEVELOPER PORTAL</button></a></li>
            </ul>
          </div>
          <div className="collapsible-menu-container" style={{width: this.state.collapsible_menu ? "300px": "0px", padding: this.state.collapsible_menu ? "30px": "0px"}}>
            {this.state.collapsible_menu ? 
              (
                <div className="collapsible-menu">
                  <div onClick = {() => this.toggleCollapsibleMenu()} className="cross-item">&#x2718;</div>
                  <Link to="/"><div className="collapsible-menu-item">Home</div></Link>
                  <Link to="/getting_started"><div className="collapsible-menu-item">Get Started</div></Link>
                  <Link to="/docs"><div className="collapsible-menu-item">Docs</div></Link>
                  <Link to="/contact"><div className="collapsible-menu-item">Contact</div></Link>
                </div>
              ) : ""
            }
          </div>

        </nav>
      </div></div>
        )
    }
}
