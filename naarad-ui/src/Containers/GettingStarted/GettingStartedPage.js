import React from "react";
import mobileBlockChainImg from "../../Assets/Images/mobileBlock.png"
import { Link } from "react-router-dom";
import "./GettingStartedPage.css";
import { RegistrationForm } from "../../Components/RegistrationForm/RegistrationForm";

export class GettingStartedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    onStepSelect(stepId) {
      if (stepId == this.state.selected) {
        this.setState({
          selected: null
        })
        return
      }
      this.setState({
        selected: stepId
      })
    }

    render() {
        return (
            <div>
                <section className={'u-align-center' + ' u-clearfix' + ' u-palette-2-base' + ' u-section-6'} id="carousel_beb6">
      <div className={"u-clearfix" + "  u-sheet" + "  u-sheet-1"}>
        <div className={"u-clearfix" + "  u-layout-wrap" + "  u-layout-wrap-1"}>
          <div className={"u-layout"}>
            <div className={"u-layout-row"}>
              <div className={"u-align-left" + "  u-container-style" + "  u-layout-cell" + "  u-size-36" + "  u-layout-cell-1"}>
                <div className={"u-container-layout" + "  u-container-layout-1"}>
                  <div className={"u-accordion" + "  u-spacing-2" + "  u-accordion-1"}>
                    <div className={"u-accordion-item" + "  u-accordion-item-1"} >
                      <a onClick={() => this.onStepSelect("step-1")} className={"u-accordion-link" + "  u-button-style" + "  u-custom-color-1" + "  u-text-active-black" + "  u-text-body-color" + "  u-accordion-link-1" + (this.state.selected === "step-1" ? " active": "")} id="link-accordion-7c0e" aria-controls="accordion-7c0e" aria-selected="true">
                        <span className={"u-accordion-link-text"}>Request an API key</span><span className={"u-accordion-link-icon" + "  u-icon" + "  u-icon-circle" + "  u-palette-1-base" + "  u-text-white" + "  u-icon-1"}><svg className={"u-svg-link"} preserveAspectRatio="xMidYMin slice" viewBox="0 0 426.66667 426.66667"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-347e"></use></svg><svg className={"u-svg-content"} viewBox="0 0 426.66667 426.66667" id="svg-347e"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"></path></svg></span>
                      </a>
                      {/* <div className={"u-accordion-active" + "  u-accordion-pane" + "  u-align-left" + "  u-container-style" + "  u-custom-color-2" + "  u-accordion-pane-1"} id="accordion-7c0e" aria-labelledby="link-accordion-7c0e"> */}
                      <div className={"u-accordion-pane" + "  u-align-left" + "  u-container-style" + "  u-custom-color-2" + "  u-accordion-pane-1" + (this.state.selected === "step-1" ? " u-accordion-active": "")} id="accordion-7c0e" aria-labelledby="link-accordion-7c0e">
                        <div className={"u-container-layout" + "  u-valign-top" + "  u-container-layout-2"}>
                          <p className={"u-text" + "  u-text-1"}>You will need an API key to register your dApp with Naarad, and also to setup Naarad in your dApp.</p>
                          <p className={"u-text" + "  u-text-2"}> For now, you will have to request an API key manually by contacting <span style={{fontWeight: "700"}} className={"u-text-palette-1-base"}>wert#9273</span> on Discord. In the future, you should be able to do it through this portal by linking your wallet.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={"u-accordion-item" + "  u-accordion-item-2" }>
                      <a onClick={() => this.onStepSelect("step-2")} className={"u-accordion-link" + "  u-button-style" + "  u-custom-color-1" + "  u-text-active-black" + "  u-text-body-color" + "  u-accordion-link-2" + (this.state.selected === "step-2" ? " active": "")} id="link-accordion-05cb" aria-controls="accordion-05cb" aria-selected="false">
                        <span className={"u-accordion-link-text"}>Register your dApp with Naarad</span><span className={"u-accordion-link-icon" + "  u-icon" + "  u-icon-circle" + "  u-palette-1-base" + "  u-text-white" + "  u-icon-2"}><svg className={"u-svg-link"} preserveAspectRatio="xMidYMin slice" viewBox="0 0 426.66667 426.66667"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-ae03"></use></svg><svg className={"u-svg-content"} viewBox="0 0 426.66667 426.66667" id="svg-ae03"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"></path></svg></span>
                      </a>
                      <div className={"u-accordion-pane" + "  u-align-left" + "  u-container-style" + "  u-custom-color-2" + "  u-accordion-pane-2" + (this.state.selected === "step-2" ? " u-accordion-active": "")} id="accordion-05cb" aria-labelledby="link-accordion-05cb">
                        <div className={"u-container-layout" + "  u-container-layout-3"}>
                          <ul className={"u-custom-list" + "  u-text" + "  u-text-3"}>
                            <li>
                              <div className={"u-list-icon"}>
                                <div xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlSpace="preserve" className={"u-svg-content"}>–</div>
                              </div>Already have an API key ? Submit the information below to register a new dApp with Naarad.
                            </li>
                          </ul>

                            <RegistrationForm />
                            
                        </div>
                      </div>
                    </div>
                    <div className={"u-accordion-item" + "  u-accordion-item-3"} >
                      <a onClick={() => this.onStepSelect("step-3")} className={"u-accordion-link" + "  u-button-style" + "  u-custom-color-1" + "  u-text-active-black" + "  u-text-body-color" + "  u-accordion-link-3" + (this.state.selected === "step-3" ? " active": "")} id="link-accordion-a6bb" aria-controls="accordion-a6bb" aria-selected="false">
                        <span className={"u-accordion-link-text"}>Add the SDK to your dApp</span><span className={"u-accordion-link-icon" + "  u-icon" + "  u-icon-circle" + "  u-palette-1-base" + "  u-text-white" + "  u-icon-3"}><svg className={"u-svg-link"} preserveAspectRatio="xMidYMin slice" viewBox="0 0 426.66667 426.66667"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-a4a8"></use></svg><svg className={"u-svg-content"} viewBox="0 0 426.66667 426.66667" id="svg-a4a8"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"></path></svg></span>
                      </a>
                      <div className={"u-accordion-pane" + "  u-align-left" + "  u-container-style" + "  u-custom-color-2" + "  u-accordion-pane-3" + (this.state.selected === "step-3" ? " u-accordion-active": "")} id="accordion-a6bb" aria-labelledby="link-accordion-a6bb">
                        <div className={"u-container-layout" + "  u-valign-top" + "  u-container-layout-4"}>
                          <p className={"u-text" + "  u-text-4"}> To add the SDK to your dApp, take a look at the <code>Setting up</code> section in the <Link to="/docs" className={"u-active-none" + "  u-border-none" + "  u-btn" + "  u-button-link" + "  u-button-style" + "  u-hover-none" + "  u-none" + "  u-text-palette-1-base" + "  u-btn-2"}>docs</Link>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"u-container-style" + "  u-layout-cell" + "  u-palette-2-base" + "  u-size-24" + "  u-layout-cell-2"}>
                <div className={"u-container-layout" + "  u-container-layout-5"}>
                  <img className={"u-image" + "  u-image-default" + "  u-preserve-proportions" + "  u-image-1"} src={mobileBlockChainImg} alt="" data-image-width="512" data-image-height="512"/>
                  <h2 className={"u-align-center" + "  u-custom-font" + "  u-font-ubuntu" + "  u-text" + "  u-text-5"}>Complete the steps on the left to set up Naarad.</h2>
                  <p className={"u-align-center" + "  u-text" + "  u-text-6"}>Facing difficulties ? Take a look at the <Link to="/docs">docs</Link>, or contact wert#9273 on Discord.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
            </div>
        )
    }
}