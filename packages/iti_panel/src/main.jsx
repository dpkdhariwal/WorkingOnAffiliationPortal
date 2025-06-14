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
import Signup from "./components/custompages/Signup";
import Forgetpassword from "./components/custompages/Forgetpassword.jsx";
import LandingPage from "./landingpage/Landingpage.jsx";
import "animate.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Fragment>
    <HelmetProvider>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path={`${import.meta.env.BASE_URL}/SignIn`}
              element={<Signin />}
            ></Route>
            <Route
              path={`${import.meta.env.BASE_URL}/SignUp`}
              element={<Signup />}
            ></Route>
            <Route
              path={`${import.meta.env.BASE_URL}/Forgetpassword`}
              element={<Forgetpassword />}
            ></Route>

            <Route
              path={`${import.meta.env.BASE_URL}`}
              element={<Signin />}
            ></Route>
            {/* <Route index element={<Signin />} /> */}
            {Routedata.map((idx) => (
              <Route key={idx.id} path={idx.path} element={<App />}>
                <Route key={idx.id} path={idx.path} element={idx.elementName} />
                {idx.children &&
                  idx.children.map((route, index) => (
                    <Route
                      key={index}
                      path={idx.path + route.path}
                      element={route.elementName}
                    />
                  ))}
              </Route>
            ))}
            {/* </Route> */}
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
