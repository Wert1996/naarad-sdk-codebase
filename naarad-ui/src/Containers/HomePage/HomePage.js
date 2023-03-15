import React from "react";
import "./HomePage.css"
// import homePageStyles from "./HomePage.module.css"
import naaradLogo from "../../Assets/Images/naaradLogo.png"
import keyImg from "../../Assets/Images/keyImg.png"
import registerImg from "../../Assets/Images/registerImg.png"
import codeImg from "../../Assets/Images/codeImg.png"
import { Link } from "react-router-dom";
// import commonStyles from "../../Assets/Styles/Common.module.css"
// let styles = {}
// Object.assign(styles, homePageStyles, commonStyles)


export class HomePage extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div>
            <section className={"u-align-left" + " u-clearfix" + " u-palette-2-base" + " u-section-1"} id="carousel_746e">
      <div className={"u-clearfix" + " u-sheet" + " u-sheet-1"}>
        <h3 className={"u-custom-font" + " u-font-montserrat" + " u-text" + " u-text-body-color" + " u-text-1"}>Naarad</h3>
        <h2 className={"u-custom-font" + " u-font-montserrat" + " u-text" + " u-text-2"}>SDK</h2>
        <div className={"u-list" + " u-list-1"}>
          <div className={"u-repeater" + " u-repeater-1"}>
            <div className={"u-align-left" + " u-container-style" + " u-list-item" + " u-repeater-item" + " u-shape-rectangle"}>
              <div className={"u-container-layout" + " u-similar-container" + " u-container-layout-1"}>
                <div className={"u-black" + " u-shape" + " u-shape-rectangle" + " u-shape-1"}></div>
                <p className={"u-text" + " u-text-3"}> Simple, scalable mobile notifications SDK for your Decentralised applications.</p>
              </div>
            </div>
            <div className={"u-align-left" + " u-container-style" + " u-list-item" + " u-repeater-item" + " u-shape-rectangle"}>
              <div className={"u-container-layout" + " u-similar-container" + " u-container-layout-2"}>
                <div className={"u-black" + " u-shape" + " u-shape-rectangle" + " u-shape-2"}></div>
                <p className={"u-text" + " u-text-4"}> Using Naarad, adding a push notification system to your mobile dApp becomes easier than ever before. </p>
              </div>
            </div>
          </div>
        </div>
        <img className={"u-image" + " u-image-contain" + " u-image-default" + " u-preserve-proportions" + " u-image-1"} src={naaradLogo} alt="" data-image-width="500" data-image-height="500"/>
        <div className={"u-black" + " u-shape" + " u-shape-rectangle" + " u-shape-3"}></div>
        <p className={"u-text" + " u-text-5"}> Let the god of push notifications handle it for you.:&nbsp;<br/>- Setting blockchain listeners.&nbsp;<br/>- Maintaining user device - info&nbsp;<br/>- Backend infrastructure to send notifications&nbsp;<br/>- Only a few lines of code to set up your client mobile app.
        </p>
      </div>
    </section>
    <section className={"u-clearfix" + " u-section-2"} id="sec-846c">
      <div className={"u-clearfix" + " u-sheet" + " u-sheet-1"}></div>
    </section>
    <section className={"u-align-center" + " u-clearfix" + " u-palette-2-base" + " u-section-3"} id="sec-77e8">
      <div className={"u-clearfix" + " u-sheet" + " u-valign-middle" + " u-sheet-1"}>
        <h1 className={"u-text" + " u-text-default" + " u-text-1"}>Interested ?</h1>
        <p className={"u-text" + " u-text-2"}>Set up Naarad in your dApp now in 3 easy steps.</p>
      </div>
    </section>
    <section className={"u-align-center" + " u-clearfix" + " u-section-4"} id="sec-8979">
      <div className={"u-align-left" + " u-clearfix" + " u-sheet" + " u-sheet-1"}>
        <div className={"u-expanded-width" + " u-list" + " u-list-1"}>
          <div className={"u-repeater" + " u-repeater-1"}>
            <div className={"u-container-style" + " u-list-item" + " u-repeater-item"}>
              <div className={"u-container-layout" + " u-similar-container" + " u-container-layout-1"}><span className={"u-file-icon" + " u-icon" + " u-icon-1"}><img src={keyImg} alt=""/></span>
                <h3 className={"u-align-center" + " u-text" + " u-text-default" + " u-text-1"}>Request an API Key</h3>
                <p className={"u-align-center" + " u-text" + " u-text-2"}>For now, you need to contact @wert on Discord to get access to Naarad.</p>
              </div>
            </div>
            <div className={"u-align-center" + " u-container-style" + " u-list-item" + " u-repeater-item"}>
              <div className={"u-container-layout" + " u-similar-container" + " u-container-layout-2"}><span className={"u-file-icon" + " u-icon" + " u-icon-2"}><img src={registerImg} alt=""/></span>
                <h3 className={"u-align-center" + " u-text" + " u-text-default" + " u-text-3"}>Register your dApp</h3>
                <p className={"u-align-center" + " u-text" + " u-text-4"}>Fill up a few details about your dApp and register, so that Naarad starts sending notifications.</p>
              </div>
            </div>
            <div className={"u-container-style" + " u-list-item" + " u-repeater-item"}>
              <div className={"u-container-layout" + " u-similar-container" + " u-container-layout-3"}><span className={"u-file-icon" + " u-icon" + " u-icon-3"}><img src={codeImg} alt=""/></span>
                <h3 className={"u-align-center" + " u-text" + " u-text-default" + " u-text-5"}>Use the SDK</h3>
                <p className={"u-align-center" + " u-text" + " u-text-6"}>Set up your mobile dApp to listen to notifications from Naarad with a few code changes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className={"u-align-center" + " u-clearfix" + " u-image" + " u-shading" + " u-section-5"} src="" data-image-width="1280" data-image-height="853" id="sec-0d62">
      <div className={"u-clearfix" + " u-sheet" + " u-sheet-1"}>
        <h1 className={"u-text" + " u-text-default" + " u-text-palette-2-base" + " u-title" + " u-text-1"}>BREEZE</h1>
        <p className={"u-large-text" + " u-text" + " u-text-default" + " u-text-variant" + " u-text-2"}>That's how simple on chain notifications would become, if you use Naarad.&nbsp;<br/>Click below to get started now.&nbsp;<br/>Estimated time for set up: 5 minutes.
        </p>
        <Link style={{zIndex: 1}} to="getting_started" className={"u-btn" + " u-button-style" + " u-palette-2-base" + " u-btn-1"}>GET STARTED</Link>
        <div className={"u-container-style" + " u-group" + " u-group-1"}>
          <div className={"u-container-layout" + " u-container-layout-1"}><span className={"u-icon" + " u-icon-circle" + " u-icon-1"}><svg className={"u-svg-link"} preserveAspectRatio="xMidYMin slice" viewBox="0 0 409.294 409.294" ><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-6c4a"></use></svg><svg className={"u-svg-content"} viewBox="0 0 409.294 409.294" id="svg-6c4a"><path d="m0 204.647v175.412h175.412v-175.412h-116.941c0-64.48 52.461-116.941 116.941-116.941v-58.471c-96.728 0-175.412 78.684-175.412 175.412z"></path><path d="m409.294 87.706v-58.471c-96.728 0-175.412 78.684-175.412 175.412v175.412h175.412v-175.412h-116.941c0-64.48 52.461-116.941 116.941-116.941z"></path></svg></span>
            <p className={"u-align-center" + " u-text" + " u-text-3"}>“I wish I had known about it much earlier.”</p><span className={"u-icon" + " u-icon-circle" + " u-text-palette-2-base" + " u-icon-2"}><svg className={"u-svg-link"} preserveAspectRatio="xMidYMin slice" viewBox="0 0 409.294 409.294" ><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-daee"></use></svg><svg className={"u-svg-content"} viewBox="0 0 409.294 409.294" id="svg-daee"><path d="m0 204.647v175.412h175.412v-175.412h-116.941c0-64.48 52.461-116.941 116.941-116.941v-58.471c-96.728 0-175.412 78.684-175.412 175.412z"></path><path d="m409.294 87.706v-58.471c-96.728 0-175.412 78.684-175.412 175.412v175.412h175.412v-175.412h-116.941c0-64.48 52.461-116.941 116.941-116.941z"></path></svg></span>
            <p className={"u-align-center" + " u-text" + " u-text-4"}>- You, after trying out Naarad</p>
          </div>
        </div>
      </div>
    </section>
    </div>
        )
    }
}
