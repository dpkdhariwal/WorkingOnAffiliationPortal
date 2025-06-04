import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Loader from "./layouts/Loader";
import App from "./components/App";
import { Customlayout } from "./components/Customlayout";
import { Routedata } from "./common/Routingdata";
import Error505 from "./components/custompages/Error505";
import Signin from "./components/custompages/Signin.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <Fragment>
    <HelmetProvider>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<Signin />}></Route>
            <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
              {Routedata.map((idx) => (
                <Route key={idx.id} path={idx.path} element={idx.elementName} />
              ))}
            </Route>
            <Route
              path={`${import.meta.env.BASE_URL}`}
              element={<Customlayout />}
            >
              <Route path="*" element={<Error505 />} />
              <Route
                path={`${import.meta.env.BASE_URL}custompages/error505`}
                element={<Error505 />}
              />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </Fragment>
);
