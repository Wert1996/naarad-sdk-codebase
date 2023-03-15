import React from "react";
import { Layout } from "./Containers/Layout/Layout";
import { HomePage } from "./Containers/HomePage/HomePage";
import { GettingStartedPage } from "./Containers/GettingStarted/GettingStartedPage";
import { DocsPage } from "./Containers/Docs/DocsPage";
import {ContactPage} from "./Containers/Contact/Contact"
import NoPage from "./Containers/NoPage/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


class App extends React.Component {

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="getting_started" element={<GettingStartedPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="contact" element={<ContactPage />} /> 
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
