import React from "react";
import naaradLogo from "../../Assets/Images/naaradLogo.png"
import { Link } from "react-router-dom"
// import styles from "../../Assets/Styles/Common.module.css"
import "../../Assets/Styles/Common.css"


export class NavBar extends React.Component {
    constructor() {
        super();
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
            <a className={'u-button-style' + ' u-custom-left-right-menu-spacing' + ' u-custom-padding-bottom' + ' u-custom-top-bottom-menu-spacing' + ' u-nav-link' + ' u-palette-2-base' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} href="#">
              <svg className={'u-svg-link'} viewBox="0 0 24 24"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#menu-hamburger"></use></svg>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><symbol id="menu-hamburger" viewBox="0 0 16 16" style={{width: "16px", height: "16px"}}><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
                </symbol>
                </defs></svg>
            </a>
          </div>
          <div className={'u-custom-menu' + ' u-nav-container'}>
            <ul className={'u-nav' + ' u-unstyled' + ' u-nav-1'}><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} to="/" style={{padding: "10px 20px"}}>Home</Link>
            </li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} to="getting_started" style={{padding: "10px 20px"}}>Get Started</Link>
            </li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} to="docs" style={{padding: "10px 20px"}}>Docs</Link>
            </li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link' + ' u-text-active-palette-1-base' + ' u-text-hover-palette-2-base'} to="contact" style={{padding: "10px 20px"}}>Contact</Link>
            </li></ul>
          </div>
          <div className={'u-custom-menu' + ' u-nav-container-collapse'}>
            <div className={'u-black' + ' u-container-style' + ' u-inner-container-layout' + ' u-opacity' + ' u-opacity-95' + ' u-sidenav'}>
              <div className={'u-sidenav-overflow'}>
                <div className={'u-menu-close'}></div>
                <ul className={'u-active-palette-1-base' + ' u-align-center' + ' u-nav' + ' u-popupmenu-items' + ' u-unstyled' + ' u-nav-2'}><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link'} to="/">Home</Link>
</li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link'} to="getting_started">Get Started</Link>
</li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link'} to="docs">Docs</Link>
</li><li className={'u-nav-item'}><Link className={'u-button-style' + ' u-nav-link'} to="contact">Contact</Link>
</li></ul>
              </div>
            </div>
            <div className={'u-black' + ' u-menu-overlay' + ' u-opacity' + ' u-opacity-70'}></div>
          </div>
        </nav>
      </div></div>
        )
    }
}
