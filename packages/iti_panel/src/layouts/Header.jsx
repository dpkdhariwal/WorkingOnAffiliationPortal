import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ThemeChanger } from "../common/redux/Action";
import Store from "../common/redux/Store";
import { Link } from "react-router-dom";
import ALLImages from "../common/Imagedata";
import {
  Badge,
  Button,
  Dropdown,
  DropdownDivider,
  Form,
  InputGroup,
  ListGroup,
  Offcanvas,
} from "react-bootstrap";
import Select from "react-select";
import Rightside from "./Rightside";
import { MENUITEMS } from "../common/Sidemenu";
import Switcher from "./Switcher";

const Header = ({ local_varaiable, ThemeChanger }) => {
  const HeaderSearchData = [
    { value: "Business Case", label: "Business Case" },
    { value: "T-Projects...", label: "T-Projects..." },
    { value: "Microsoft Project", label: "Microsoft Project" },
    { value: "Risk Management", label: "Risk Management " },
    { value: "Team Building", label: "Team Building" },
  ];

  // FullScreen
  const [isFullScreen, setIsFullScreen] = useState(false);

  const elem = document.documentElement;

  const openFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      requestFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const requestFullscreen = () => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  const handleFullscreenChange = () => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  //search visibility function
  const [isSearchDropVisible, setSearchDropVisible] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [customshow, _setCustomshow] = useState(true);
  const [NavData, setNavData] = useState([]);
  const [searchcolor, setsearchcolor] = useState("text-dark");
  const [searchval, setsearchval] = useState("Type something");
  const searchRef = useRef(null);

  const linkData = [
    { path: "#calender", icon: "bx-calendar", text: "Calendar" },
    { path: "#mail", icon: "bx-envelope", text: "Mail" },
    { path: "#button", icon: "bx-dice-1", text: "Buttons" },
  ];

  const toggleSearchDropdown = (e) => {
    e.stopPropagation();
    setSearchDropVisible(!isSearchDropVisible);
  };

  const handleDocumentClick = (e) => {
    // Check if the clicked element is outside the "header-search" div
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchDropVisible(false);
    }
  };

  useEffect(() => {
    // Add click event listener when component mounts
    document.addEventListener("click", handleDocumentClick);

    // Remove click event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  //rightsidebar

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Switcher functionality

  const [showSwitcher, setShowSwitcher] = useState(false);

  const handleSwitcherClick = () => {
    setShowSwitcher(true);
  };

  //Dark mode

  const ToggleDark = () => {
    const theme = Store.getState().theme;
    const isDarkMode = theme.dataThemeMode === "dark";

    const updatedTheme = {
      ...theme,
      dataThemeMode: isDarkMode ? "light" : "dark",
      dataHeaderStyles: isDarkMode ? "light" : "dark",
      dataMenuStyles:
        theme.dataNavLayout === "horizontal" && !isDarkMode
          ? "dark"
          : isDarkMode
          ? "dark"
          : "dark",
    };

    ThemeChanger(updatedTheme);

    if (theme.dataThemeMode === "light") {
      localStorage.setItem("spruhadarktheme", "dark");
      localStorage.removeItem("spruhalighttheme");
    } else {
      localStorage.setItem("spruhalighttheme", "light");
      localStorage.removeItem("spruhadarktheme");
      localStorage.removeItem("darkBgRGB1");
      localStorage.removeItem("darkBgRGB2");
      localStorage.removeItem("darkBgRGB3");
      localStorage.removeItem("darkBgRGB4");
      localStorage.removeItem("spruhaHeader");
      localStorage.removeItem("spruhaMenu");
    }
  };

  function menuClose() {
    const theme = Store.getState().theme;
    ThemeChanger({ ...theme, toggled: "close" });
    if (window.innerWidth < 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    }
  }

  const toggleSidebar = () => {
    const theme = Store.getState().theme;
    let sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        let verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, datanavstyle: "" });
            if (theme.toggled === "icon-overlay-close") {
              ThemeChanger({
                ...theme,
                toggled: "",
                iconOverlay: "",
                dataVerticalStyle: "default",
              });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({
                  ...theme,
                  toggled: "icon-overlay-close",
                  iconOverlay: "",
                });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            } else {
              const sidemenu = document.querySelector(
                ".side-menu__item.active"
              );
              if (sidemenu) {
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    "double-menu-active"
                  );
                  ThemeChanger({ ...theme, toggled: "double-menu-open" });
                } else {
                  ThemeChanger({ ...theme, toggled: "double-menu-close" });
                }
              }
            }

            break;
          // detached
          case "detached":
            if (theme.toggled === "detached-close") {
              ThemeChanger({ ...theme, toggled: "", iconOverlay: "" });
            } else {
              ThemeChanger({
                ...theme,
                toggled: "detached-close",
                iconOverlay: "",
              });
            }

            break;

          // default
          case "default":
            ThemeChanger({
              ...theme,
              toggled: "icon-overlay-close",
              dataVerticalStyle: "overlay",
            });
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.toggled === "menu-click-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "menu-click-closed" });
            }
            break;
          // menu-hover
          case "menu-hover":
            if (theme.toggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "menu-hover-closed" });
            }
            break;
          case "icon-click":
            if (theme.toggled === "icon-click-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-click-closed" });
            }
            break;
          case "icon-hover":
            if (theme.toggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-hover-closed" });
            }
            break;
        }
      }
    } else {
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, toggled: "open" });

        setTimeout(() => {
          if (theme.toggled == "open") {
            const overlay = document.querySelector("#responsive-overlay");

            if (overlay) {
              overlay.classList.add("active");
              overlay.addEventListener("click", () => {
                const overlay = document.querySelector("#responsive-overlay");

                if (overlay) {
                  overlay.classList.remove("active");
                  menuClose();
                }
              });
            }
          }

          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector("#responsive-overlay");

              if (overlay) {
                overlay.classList.remove("active");
              }
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, toggled: "close" });
      }
    }
  };

  //cart remove function

  const HeaderCart = [
    {
      id: 1,
      preview: ALLImages("ecommerce1"),
      itemName: "Smart Watch",
      price: "$1,299.00",
      ulElement: (
        <ul className="header-product-item d-flex mb-0">
          {" "}
          <li>Qty: 1</li>{" "}
          <li>
            Status: <span className="text-success">In Stock</span>
          </li>{" "}
        </ul>
      ),
    },
    {
      id: 2,
      preview: ALLImages("ecommerce3"),
      itemName: "Flowers",
      price: "$179.29",
      ulElement: (
        <ul className="header-product-item d-flex mb-0">
          {" "}
          <li>Qty: 2</li>{" "}
          <li>
            <span className="badge bg-pink-transparent fs-10">
              Free shipping
            </span>
          </li>
        </ul>
      ),
    },
    {
      id: 3,
      preview: ALLImages("ecommerce5"),
      itemName: "Running Shoes",
      price: "$29.00",
      ulElement: (
        <ul className="header-product-item d-flex mb-0">
          {" "}
          <li>Qty: 4</li>{" "}
          <li>
            Status: <span className="text-danger">Out Stock</span>
          </li>{" "}
        </ul>
      ),
    },
    {
      id: 4,
      preview: ALLImages("ecommerce4"),
      itemName: "Furniture",
      price: "$4,999.00",
      ulElement: (
        <ul className="header-product-item d-flex mb-0">
          {" "}
          <li>Gray</li> <li>50LB</li>{" "}
        </ul>
      ),
    },
    {
      id: 5,
      preview: ALLImages("ecommerce6"),
      itemName: "Tourist Bag",
      price: "$129.00",
      ulElement: (
        <ul className="header-product-item d-flex mb-0">
          {" "}
          <li>Qty: 1</li>{" "}
          <li>
            Status: <span className="text-success">In Stock</span>
          </li>{" "}
        </ul>
      ),
    },
  ];

  const [data1, setData1] = useState([]);
  const [remainingCount1, setRemainingCount1] = useState(HeaderCart.length);

  const Remove1 = (id) => {
    if (!data1.includes(id)) {
      setData1((i) => [...i, id]);
      setRemainingCount1((prevCount) => prevCount - 1);
    }
  };

  //notification remove function

  const cartData = [
    {
      id: 1,
      status: "online",
      preview: ALLImages("face5"),
      spanElement: (
        <span className="text-muted fw-normal fs-12 header-notification-text">
          Oct 15 12:32pm
        </span>
      ),
      element: (
        <a className="text-dark">
          Congratulate <strong>Olivia James</strong> for New template start
        </a>
      ),
    },
    {
      id: 2,
      status: "offline",
      preview: ALLImages("face2"),
      spanElement: (
        <span className="text-muted fw-normal fs-12 header-notification-text">
          Oct 13 02:56am
        </span>
      ),
      element: (
        <a className="text-dark">
          <strong>Joshua Gray</strong> New Message Received
        </a>
      ),
    },
    {
      id: 3,
      status: "online",
      preview: ALLImages("face3"),
      spanElement: (
        <span className="text-muted fw-normal fs-12 header-notification-text">
          Oct 12 10:40pm
        </span>
      ),
      element: (
        <a className="text-dark">
          <strong>Elizabeth Lewis</strong> added new schedule realease
        </a>
      ),
    },
    {
      id: 4,
      status: "online",
      preview: ALLImages("face5"),
      spanElement: (
        <span className="text-muted fw-normal fs-12 header-notification-text">
          Order <span className="text-warning">ID: #005428</span> had been
          placed
        </span>
      ),
      element: (
        <a className="text-dark">
          Delivered Successful to <strong>Micky</strong>{" "}
        </a>
      ),
    },
    {
      id: 5,
      status: "offline",
      preview: ALLImages("face1"),
      spanElement: (
        <span className="text-muted fw-normal fs-12 header-notification-text">
          Today at 08:08pm
        </span>
      ),
      element: (
        <a className="text-dark">
          You got 22 requests form <strong>Facebook</strong>
        </a>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [remainingCount, setRemainingCount] = useState(cartData.length);

  const Remove = (id) => {
    if (!data.includes(id)) {
      setData((i) => [...i, id]);
      setRemainingCount((prevCount) => prevCount - 1);
    }
  };

  //Search functionality

  document.addEventListener("click", function () {
    document.querySelector(".search-result")?.classList.add("d-none");
  });
  const myfunction = (inputValue) => {
    const matchingElements = [];

    const findMatchingElements = (menuItems) => {
      menuItems.forEach((menuItem) => {
        if (menuItem.title) {
          if (menuItem.children) {
            findMatchingElements(menuItem.children);
          }

          if (
            menuItem.title.toLowerCase().includes(inputValue.toLowerCase()) &&
            menuItem.title.toLowerCase().startsWith(inputValue.toLowerCase())
          ) {
            matchingElements.push(menuItem);
          }
        }
      });
    };

    findMatchingElements(MENUITEMS);

    if (!matchingElements.length || inputValue === "") {
      if (inputValue === "") {
        // Handle case when inputValue is empty
        setShow1(false);
        setShow2(false);
        setsearchval("Type something");
        setsearchcolor("text-dark");
      } else {
        // Handle case when no matching elements are found
        setShow1(true);
        setShow2(false);
        setsearchcolor("text-danger");
        setsearchval("There is no component with this name");
      }
    } else {
      setShow1(true);
      setShow2(true);
      setsearchcolor("text-dark");
      setsearchval("");
    }

    setNavData(matchingElements);
  };
  return (
    <Fragment>
      <header className="app-header">
        <div className="main-header-container container-fluid">
          <div className="header-content-left">
            <div className="header-element">
              <div className="horizontal-logo">
                <Link
                  to={`${import.meta.env.BASE_URL}dashboard/dashboard`}
                  className="header-logo"
                >
                  <img
                    src={ALLImages("logo2")}
                    alt="logo"
                    className="desktop-logo"
                  />
                  <img
                    src={ALLImages("logo5")}
                    alt="logo"
                    className="toggle-logo"
                  />
                  <img
                    src={ALLImages("logo1")}
                    alt="logo"
                    className="desktop-dark"
                  />
                  <img
                    src={ALLImages("logo4")}
                    alt="logo"
                    className="toggle-dark"
                  />
                  <img
                    src={ALLImages("logo3")}
                    alt="logo"
                    className="desktop-white"
                  />
                  <img
                    src={ALLImages("logo6")}
                    alt="logo"
                    className="toggle-white"
                  />
                </Link>
              </div>
            </div>

            <div className="header-element">
              <Link
                aria-label="Hide Sidebar"
                className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
                data-bs-toggle="sidebar"
                to="#"
                onClick={() => toggleSidebar()}
              >
                <span></span>
              </Link>
            </div>

            <div className="main-header-center  d-none d-lg-block  header-link">
              {/* <InputGroup className="search-results">
                <Select
                  options={HeaderSearchData}
                  placeholder="Choose one"
                  classNamePrefix="Select2"
                  className="input-group-btn search-panel"
                />
                <Form.Control
                  defaultValue={InputValue}
                  onChange={(ele) => {
                    myfunction(ele.target.value);
                    setInputValue(ele.target.value);
                    setSearchDropVisible(true);
                  }}
                  placeholder="Search for results..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onClick={toggleSearchDropdown}
                />
                <Button variant="primary" id="basic-addon1">
                  <i className="fe fe-search" aria-hidden="true"></i>
                </Button>
              </InputGroup> */}
              <div
                className={`header-search ${
                  isSearchDropVisible ? "searchdrop" : ""
                }`}
                ref={searchRef}
              >
                <div className="p-3">
                  {show1 ? (
                    <>
                      {" "}
                      <ListGroup className="my-2 border-0">
                        {" "}
                        {show2 ? (
                          NavData.map((e) => (
                            <ListGroup.Item key={Math.random()} className="">
                              {" "}
                              <Link
                                to={`${e.path}/`}
                                onClick={() => {
                                  setShow1(false), setInputValue("");
                                  setSearchDropVisible(false);
                                }}
                              >
                                <i className="fe fe-chevron-right me-2"></i>
                                {e.title}
                              </Link>
                            </ListGroup.Item>
                          ))
                        ) : (
                          <b className={`${searchcolor} `}>{searchval}</b>
                        )}{" "}
                      </ListGroup>{" "}
                    </>
                  ) : (
                    ""
                  )}

                  <div className="">
                    <p className="fw-semibold text-muted mb-2 fs-13">
                      Recent Searches
                    </p>
                    <div className="ps-2">
                      <Link to="#" className="search-tags  me-3">
                        <i className="fe fe-search me-2"></i>People<span></span>
                      </Link>
                      <Link to="#" className="search-tags  me-3">
                        <i className="fe fe-search me-2"></i>Pages<span></span>
                      </Link>
                      <Link to="#" className="search-tags">
                        <i className="fe fe-search me-2"></i>Articles
                        <span></span>
                      </Link>
                    </div>
                  </div>
                  {customshow && !show2 && (
                    <div className="mt-3">
                      <p className="fw-semibold text-muted mb-2 fs-13">
                        Apps and pages
                      </p>
                      <ul className="ps-2">
                        {linkData.map((link) => (
                          <li
                            key={link.path}
                            className="p-1 d-flex align-items-center text-muted mb-2 search-app"
                          >
                            <Link
                              to={link.path}
                              onClick={() => {
                                setSearchDropVisible(false);
                              }}
                            >
                              <span>
                                <i
                                  className={`bx ${link.icon} me-2 fs-14 bg-primary-transparent p-2 rounded-circle`}
                                ></i>
                                {link.text}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {customshow && !show2 && (
                    <div className="mt-3">
                      <p className="fw-semibold text-muted mb-2 fs-13">Links</p>
                      <ul className="ps-2">
                        <li className="p-1 align-items-center text-muted mb-1 search-app">
                          <Link to="#" className="text-primary">
                            <u>http://spruko/html/spruko.com</u>
                          </Link>
                        </li>
                        <li className="p-1 align-items-center text-muted mb-1 search-app">
                          <Link to="#" className="text-primary">
                            <u>http://spruko/demo/spruko.com</u>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="py-3 border-top px-0">
                  <div className="text-center">
                    <Link
                      to="#"
                      className="text-primary text-decoration-underline fs-15"
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="header-content-right">
            <div className="header-element header-theme-mode">
              <Link
                to="#"
                className="header-link layout-setting"
                onClick={() => ToggleDark()}
              >
                <span className="light-layout">
                  {" "}
                  <i className="fe fe-moon header-link-icon lh-2"></i>{" "}
                </span>
                <span className="dark-layout">
                  {" "}
                  <i className="fe fe-sun header-link-icon lh-2"></i>{" "}
                </span>
              </Link>
            </div>

            <Dropdown className="header-element country-selector">
              <Dropdown.Toggle
                as="a"
                variant=""
                className="header-link country-Flag"
                id="dropdown-basic"
              >
                <span>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <circle cx="256" cy="256" r="256" fill="#f0f0f0" />
                                        <g fill="#0052b4">
                                            <path d="M52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178L52.92 100.142zM503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.176zM8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075H8.819zM411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177l89.076-89.075zM100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102V370.005l-89.076 89.074zM189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075V8.819zM322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.176zM370.005 322.784l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076H370.005z" />
                                        </g>
                                        <g fill="#d80027">
                                            <path d="M509.833 222.609H289.392V2.167A258.556 258.556 0 00256 0c-11.319 0-22.461.744-33.391 2.167v220.441H2.167A258.556 258.556 0 000 256c0 11.319.744 22.461 2.167 33.391h220.441v220.442a258.35 258.35 0 0066.783 0V289.392h220.442A258.533 258.533 0 00512 256c0-11.317-.744-22.461-2.167-33.391z" />
                                            <path d="M322.783 322.784L437.019 437.02a256.636 256.636 0 0015.048-16.435l-97.802-97.802h-31.482v.001zM189.217 322.784h-.002L74.98 437.019a256.636 256.636 0 0016.435 15.048l97.802-97.804v-31.479zM189.217 189.219v-.002L74.981 74.98a256.636 256.636 0 00-15.048 16.435l97.803 97.803h31.481zM322.783 189.219L437.02 74.981a256.328 256.328 0 00-16.435-15.047l-97.802 97.803v31.482z" />
                                        </g>
                                    </svg> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#999"
                      fillRule="nonzero"
                      d="M256 0c70.68 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.99-181.01C121.31 28.66 185.32 0 256 0z"
                    />
                    <path
                      fill="#fff"
                      fillRule="nonzero"
                      d="M255.99 19.48c65.31 0 124.46 26.48 167.25 69.27 42.79 42.79 69.28 101.93 69.28 167.24s-26.49 124.46-69.28 167.25c-42.79 42.79-101.94 69.28-167.25 69.28-65.23 0-124.38-26.51-167.18-69.33-42.84-42.74-69.33-101.89-69.33-167.2 0-65.31 26.48-124.45 69.27-167.24 42.79-42.79 101.93-69.27 167.24-69.27z"
                    />
                    <path
                      fill="#F93"
                      fillRule="nonzero"
                      d="M255.99 39.59c84.4 0 157.5 48.29 193.17 118.74H62.84C98.52 87.88 171.62 39.59 255.99 39.59z"
                    />
                    <path
                      fill="#128807"
                      fillRule="nonzero"
                      d="M60.38 348.64h391.24c-34.71 73.18-109.24 123.77-195.63 123.77-86.37 0-160.89-50.59-195.61-123.77z"
                    />
                    <path
                      fill="#008"
                      d="M255.99 179.9c42.05 0 76.13 34.08 76.13 76.11 0 42.04-34.08 76.12-76.13 76.12-42.03 0-76.11-34.08-76.11-76.12 0-42.03 34.08-76.11 76.11-76.11zm13.31 75.43c-.04-.71-.13-1.41-.27-2.09l13.3-1.92 38.01-12.54-39.2 8.14-12.46 4.99c-.22-.68-.49-1.33-.81-1.95l12.34-5.29 33.46-21.96c-.9-1.56-1.85-3.08-2.87-4.55l.07-.05c-1.46 1.13-3.55.84-4.68-.61a3.345 3.345 0 0 1 .56-4.61 62.382 62.382 0 0 0-3.66-3.96v-.02l-29.87 26.65-8.29 10.57c-.53-.48-1.1-.91-1.68-1.3l8.04-10.75 18.01-35.75-21.95 33.47-5.29 12.35c-.62-.32-1.28-.59-1.97-.81l5.01-12.46 8.14-39.2-12.56 38.01-1.9 13.3c-.68-.14-1.38-.23-2.09-.28l1.6-13.34-2.3-39.95c-1.8 0-3.59.09-5.37.22l-.01-.1c.24 1.83-1.05 3.5-2.87 3.74a3.325 3.325 0 0 1-3.72-2.79c-3.58.65-7.05 1.59-10.4 2.79.65 1.68-.16 3.6-1.84 4.28-1.66.68-3.58-.08-4.31-1.73-1.63.78-3.23 1.63-4.78 2.52l21.96 33.45 5.29 12.35c.62-.32 1.27-.59 1.95-.81l-4.99-12.46-8.14-39.2 12.55 38.01 1.91 13.3c.68-.14 1.38-.23 2.09-.28l-1.6-13.34 2.28-39.95c1.81 0 3.61.08 5.39.22l.01-.1a3.342 3.342 0 0 0 2.87 3.74c1.79.24 3.45-1.01 3.72-2.79 3.58.65 7.05 1.59 10.41 2.79-.65 1.68.16 3.6 1.82 4.28 1.68.68 3.59-.08 4.32-1.73 3.28 1.55 6.38 3.34 9.33 5.39l.05-.07c-1.13 1.46-.84 3.55.61 4.67a3.36 3.36 0 0 0 4.68-.61l-.07.08a64.22 64.22 0 0 1 3.94 3.62h.02l-26.64 29.89-10.56 8.29c.48.53.9 1.08 1.28 1.68l10.76-8.06 35.74-18c.89 1.56 1.74 3.15 2.52 4.78a3.298 3.298 0 0 0-1.73 4.31c.68 1.67 2.58 2.48 4.28 1.83 1.19 3.34 2.13 6.83 2.78 10.41a3.325 3.325 0 0 0-2.78 3.72c.23 1.82 1.91 3.1 3.73 2.86l-.09.02c.13 1.77.22 3.56.22 5.37l-39.95-2.28-13.35 1.6zm-46.61-56.98 18.01 35.73 8.06 10.75c-.6.39-1.16.82-1.68 1.3l-8.3-10.57-29.87-26.63c1.27-1.27 2.6-2.49 3.96-3.66 1.13 1.39 3.18 1.65 4.61.55a3.33 3.33 0 0 0 .62-4.67l.05.07c1.48-1.02 2.99-1.97 4.54-2.87zm-13.78 10.58 26.64 29.87 10.56 8.29c-.47.53-.9 1.08-1.3 1.68l-10.75-8.06-35.74-18c-.89 1.55-1.73 3.15-2.5 4.76a3.35 3.35 0 0 1 1.72 4.33c-.68 1.67-2.6 2.48-4.27 1.83-.61 1.7-1.13 3.41-1.6 5.15l38 12.54 13.31 1.92c-.15.68-.24 1.38-.29 2.09l-13.33-1.6-39.96 2.28c0 1.81.1 3.61.22 5.38l-.09.02c1.82-.25 3.5 1.03 3.74 2.87.23 1.79-1.02 3.45-2.79 3.72.65 3.58 1.58 7.03 2.79 10.39 1.67-.64 3.59.17 4.27 1.83.68 1.67-.08 3.6-1.72 4.33.77 1.63 1.61 3.21 2.5 4.76l35.74-18 10.75-8.05c.4.59.83 1.16 1.3 1.68l-10.56 8.3-26.65 29.87h.01c1.27 1.26 2.6 2.48 3.96 3.66 1.13-1.4 3.18-1.67 4.61-.56 1.46 1.12 1.74 3.22.62 4.67l.05-.06c1.47 1.03 2.99 1.98 4.54 2.88l21.96-33.48 5.29-12.35c.62.33 1.27.6 1.95.82l-4.99 12.47-8.14 39.19c1.73.46 3.49.86 5.26 1.19a3.325 3.325 0 0 1 3.72-2.8c1.79.25 3.06 1.87 2.87 3.65 1.77.15 3.56.23 5.38.23l2.3-39.97-1.6-13.34c.71-.03 1.41-.13 2.09-.27l1.9 13.3 12.56 38.01-8.14-39.19-5.01-12.47c.69-.22 1.35-.5 1.97-.82l5.29 12.35 21.95 33.48c1.55-.9 3.09-1.87 4.56-2.88l.05.06c-1.13-1.45-.84-3.55.61-4.67 1.43-1.11 3.49-.84 4.6.56 1.37-1.16 2.7-2.4 3.97-3.66l-26.64-29.87-10.56-8.3c.48-.52.9-1.09 1.28-1.68l10.76 8.05 35.76 18-33.48-21.96-12.36-5.28c.34-.63.61-1.28.83-1.96l12.46 5.01 39.18 8.13c.46-1.72.87-3.46 1.2-5.25a3.325 3.325 0 0 1-2.78-3.72 3.318 3.318 0 0 1 3.73-2.87l-.09-.02c.14-1.77.22-3.56.22-5.38l-39.95 2.28-13.35-1.6c-.04.73-.13 1.43-.27 2.11l13.3 1.9 37.99 12.55c-.47 1.75-.98 3.46-1.58 5.14-1.7-.64-3.6.17-4.28 1.83-.7 1.7.08 3.61 1.73 4.33a64.329 64.329 0 0 1-5.39 9.32l.07.05a3.335 3.335 0 0 0-4.68.62c-1.1 1.42-.83 3.48.56 4.59a72.466 72.466 0 0 1-3.66 3.98l-29.87-26.64-8.29-10.56c-.53.46-1.1.9-1.68 1.28l8.04 10.75 18.01 35.76c-1.55.89-3.14 1.73-4.77 2.5-.71-1.64-2.63-2.42-4.32-1.72-1.7.69-2.5 2.64-1.79 4.34l-.03-.07a64.87 64.87 0 0 1-10.41 2.79 3.325 3.325 0 0 0-3.72-2.8c-1.79.25-3.06 1.87-2.87 3.65-1.77.13-3.59.23-5.4.23l-2.28-39.97 1.6-13.34c-.71-.03-1.41-.13-2.09-.27l-1.91 13.3-12.55 38.01c-1.75-.46-3.48-1-5.14-1.6a3.3 3.3 0 0 0-1.84-4.27c-1.68-.7-3.6.08-4.32 1.72a65.32 65.32 0 0 1-4.77-2.5l18.01-35.76 8.06-10.75c-.6-.38-1.16-.82-1.68-1.28l-8.3 10.56-29.88 26.64v-.02c-1.27-1.27-2.49-2.6-3.65-3.96 1.4-1.11 1.65-3.17.56-4.59a3.324 3.324 0 0 0-4.67-.62l.06-.05c-1.01-1.47-1.98-3-2.88-4.56l33.46-21.96 12.35-5.28c-.31-.63-.58-1.28-.81-1.96l-12.46 5.01-39.19 8.13 38-12.55 13.31-1.9c-.15-.68-.24-1.38-.29-2.11l-13.33 1.6-39.96-2.28c0-1.82.08-3.6.22-5.37l-.09-.02c1.82.24 3.5-1.04 3.74-2.86.23-1.79-1.02-3.45-2.79-3.72.33-1.78.73-3.53 1.19-5.26l39.19 8.14 12.46 4.99c.23-.68.5-1.33.81-1.95l-12.35-5.29-33.46-21.96c.9-1.56 1.85-3.08 2.88-4.55l-.06-.05c1.45 1.13 3.54.84 4.67-.61 1.09-1.43.84-3.49-.56-4.61 1.18-1.36 2.4-2.69 3.66-3.96z"
                    />
                  </svg>
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="main-header-dropdown" align="end">
                <li>
                  <Dropdown.Item className="d-flex align-items-center">
                    {" "}
                    <span className="avatar avatar-xs lh-1 me-2">
                      <img src={ALLImages("flag5")} alt="img" />
                    </span>
                    Hindi
                  </Dropdown.Item>
                </li>
                <li>
                  <Dropdown.Item className="d-flex align-items-center">
                    {" "}
                    <span className="avatar avatar-xs lh-1 me-2">
                      <img src={ALLImages("flag6")} alt="img" />
                    </span>
                    English
                  </Dropdown.Item>
                </li>
                {/* <li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={ALLImages('flag1')} alt="img" /></span>French</Dropdown.Item></li>
                                <li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={ALLImages('flag2')} alt="img" /></span>German</Dropdown.Item></li>
                                <li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={ALLImages('flag3')} alt="img" /></span>Italian</Dropdown.Item></li>
                                <li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={ALLImages('flag4')} alt="img" /></span>Russian</Dropdown.Item></li> */}
              </Dropdown.Menu>
            </Dropdown>

            <div className="header-element header-fullscreen  d-xl-flex d-none">
              <Link
                to="#"
                className="header-link d-xl-block d-none"
                onClick={openFullscreen}
              >
                <i
                  className={`fe ${
                    isFullScreen
                      ? "fe-minimize full-screen-close "
                      : "fe-maximize full-screen-open"
                  } header-link-icon`}
                ></i>
              </Link>
            </div>
            {/* <Dropdown
              className="header-element cart-dropdown"
              autoClose="outside"
            >
              <Dropdown.Toggle
                as="a"
                className="header-link"
                variant=""
                id="dropdown-basic"
              >
                <i className="fe fe-shopping-cart header-link-icon d-xl-block d-none"></i>
                <Badge
                  bg="primary"
                  className="rounded-pill header-icon-badge d-xl-block d-none"
                  id="cart-icon-badge"
                >
                  {remainingCount1}
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="main-header-dropdown" align="end">
                <div className="p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 fs-17 fw-semibold">Cart Items</p>
                    <Badge bg="primary" className="rounded-pill" id="cart-data">
                      {remainingCount1} Items
                    </Badge>
                  </div>
                </div>
                <div>
                  <DropdownDivider />
                </div>
                {remainingCount1 === 0 && (
                  <div className="p-5 empty-item">
                    <div className="text-center">
                      <span className="avatar avatar-xl avatar-rounded bg-warning-transparent">
                        <i className="ri-shopping-cart-2-line fs-2"></i>
                      </span>
                      <h6 className="fw-bold mb-1 mt-3">Your Cart is Empty</h6>
                      <span className="mb-3 fw-normal fs-13 d-block">
                        Add some items to make me happy :)
                      </span>
                      <Link
                        to="#"
                        className="btn btn-primary btn-wave btn-sm m-1 waves-effect waves-light"
                        data-abc="true"
                      >
                        continue shopping{" "}
                        <i className="bi bi-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                )}

                {HeaderCart.map((idx) => (
                  <Fragment key={idx.id}>
                    {!data1.includes(idx.id) && (
                      <div className="dropdown-item d-flex align-items-center cart-dropdown-item">
                        <img
                          src={idx.preview}
                          alt="img"
                          className="avatar avatar-sm br-5 me-3"
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-start justify-content-between mb-0">
                            <div className="mb-0 fs-13 text-dark fw-medium">
                              <span className="text-dark">{idx.itemName}</span>
                            </div>
                            <div>
                              <span className="text-black mb-1 fw-medium">
                                {idx.price}
                              </span>
                            </div>
                          </div>
                          <div className="min-w-fit-content d-flex align-items-start justify-content-between">
                            {idx.ulElement}
                            <div className="ms-auto">
                              <Link
                                to="#"
                                onClick={() => Remove1(idx.id)}
                                className="header-cart-remove float-end dropdown-item-close border-0"
                              >
                                <i className="ri-delete-bin-2-line"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
                {remainingCount1 > 0 && (
                  <div className="p-3 empty-header-item">
                    <div className="d-grid">
                      <Link to="#" className="btn btn-primary">
                        Proceed to checkout
                      </Link>
                    </div>
                  </div>
                )}
                <div className="p-5 empty-item d-none">
                  <div className="text-center">
                    <span className="avatar avatar-xl avatar-rounded bg-warning-transparent">
                      <i className="ri-shopping-cart-2-line fs-2"></i>
                    </span>
                    <h6 className="fw-bold mb-1 mt-3">Your Cart is Empty</h6>
                    <span className="mb-3 fw-normal fs-13 d-block">
                      Add some items to make me happy :)
                    </span>
                    <Link
                      to="#"
                      className="btn btn-primary btn-wave btn-sm m-1"
                      data-abc="true"
                    >
                      continue shopping{" "}
                      <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown> */}

            {/* <Dropdown
              className="header-element notifications-dropdown"
              align="start"
              autoClose="outside"
            >
              <Dropdown.Toggle
                as="a"
                className="header-link"
                variant=""
                id="dropdown-basic"
              >
                <i className="fe fe-bell header-link-icon"></i>
                <Badge
                  bg="secondary"
                  className="rounded-pill header-icon-badge pulse pulse-secondary"
                  id="notification-icon-badge"
                >
                  {remainingCount}
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="main-header-dropdown" align="end">
                <div className="p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 fs-17 fw-semibold">Notifications</p>
                    <Badge
                      bg="secondary"
                      className="rounded-pill"
                      id="notifiation-data"
                    >
                      {remainingCount} Unread{" "}
                    </Badge>
                  </div>
                </div>
                <DropdownDivider />
                {remainingCount === 0 && (
                  <div className="p-5 empty-item1">
                    <div className="text-center">
                      <span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
                        <i className="ri-notification-off-line fs-2"></i>
                      </span>
                      <h6 className="fw-semibold mt-3">No New Notifications</h6>
                    </div>
                  </div>
                )}
                {cartData.map((idx) => (
                  <Fragment key={idx.id}>
                    {!data.includes(idx.id) && (
                      <div
                        className="dropdown-item d-flex align-items-start"
                        key={idx.id}
                      >
                        <div className="pe-2">
                          <span
                            className={`avatar avatar-md ${idx.status} br-5`}
                          >
                            <img alt="avatar" src={idx.preview} />
                          </span>
                        </div>
                        <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1">
                            <p className="mb-0">{idx.element}</p>
                            {idx.spanElement}
                          </div>
                          <div>
                            <a
                              onClick={() => Remove(idx.id)}
                              className="min-w-fit-content text-muted me-1 dropdown-item-close1 border-0"
                            >
                              <i className="ti ti-x fs-16"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
                {remainingCount > 0 && (
                  <div className="p-3 empty-header-item1">
                    <div className="d-grid">
                      <Link to="#" className="btn btn-primary">
                        View All
                      </Link>
                    </div>
                  </div>
                )}
                <div className="p-5 empty-item1 d-none">
                  <div className="text-center">
                    <span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
                      <i className="ri-notification-off-line fs-2"></i>
                    </span>
                    <h6 className="fw-semibold mt-3">No New Notifications</h6>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown> */}

            {/* <Dropdown className="header-element header-shortcuts-dropdown  d-xl-flex d-none">
              <Dropdown.Toggle
                as="a"
                className="header-link"
                variant=""
                id="dropdown-basic"
              >
                <i className="fe fe-grid header-link-icon d-xl-block d-none"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="main-header-dropdown header-shortcuts-dropdown pb-0 dropdown-menu-end">
                <div className="p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 fs-17 fw-semibold">Related Apps</p>
                  </div>
                </div>
                <DropdownDivider />

                <div
                  className="main-header-shortcuts p-2"
                  id="header-shortcut-scroll"
                >
                  <div className="row g-2">
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng2")} alt="" />
                          </span>
                          <span className="d-block fs-12">Figma</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng6")} alt="" />
                          </span>
                          <span className="d-block fs-12">Power Point</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng7")} alt="" />
                          </span>
                          <span className="d-block fs-12">MS Word</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng1")} alt="" />
                          </span>
                          <span className="d-block fs-12">Calendar</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng8")} alt="" />
                          </span>
                          <span className="d-block fs-12">Sketch</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng3")} alt="" />
                          </span>
                          <span className="d-block fs-12">Docs</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng5")} alt="" />
                          </span>
                          <span className="d-block fs-12">Google</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng9")} alt="" />
                          </span>
                          <span className="d-block fs-12">Translate</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="#" className="text-dark">
                        <div className="text-center p-3 related-app">
                          <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                            <img src={ALLImages("apppng4")} alt="" />
                          </span>
                          <span className="d-block fs-12">Sheets</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-top">
                  <div className="d-grid">
                    <Link to="#" className="btn btn-primary">
                      View All
                    </Link>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown> */}

            <Dropdown className="header-element header-profile">
              <Dropdown.Toggle
                as="a"
                className="header-link"
                variant=""
                id="dropdown-basic"
              >
                <div className="d-flex align-items-center">
                  <div className="header-link-icon">
                    <img
                      src={ALLImages("face1")}
                      alt="img"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="d-none">
                    <p className="fw-semibold mb-0">Angelica</p>
                    <span className="op-7 fw-normal d-block fs-11">
                      Web Designer
                    </span>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="main-header-dropdown pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end">
                <div className="header-navheading border-bottom">
                  <h6 className="main-notification-title">Mr. Deepak</h6>
                  <p className="main-notification-text mb-0">ITI Applicant</p>
                </div>
                <Dropdown.Item as={Link} to="#profile" className="d-flex">
                  <i className="fe fe-user fs-16 align-middle me-2"></i>Profile
                </Dropdown.Item>
                {/* <Dropdown.Item as={Link} to="#inbox" className="d-flex">
                  <i className="fe fe-inbox fs-16 align-middle me-2"></i>Inbox{" "}
                  <span className="badge bg-success ms-auto">25</span>
                </Dropdown.Item> */}
                <Dropdown.Item
                  as={Link}
                  to="#activity"
                  className=" d-flex border-block-end"
                >
                  <i className="fe fe-compass fs-16 align-middle me-2"></i>
                  Activity
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="#Settings" className="d-flex">
                  <i className="fe fe-settings fs-16 align-middle me-2"></i>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="#Support" className="d-flex">
                  <i className="fe fe-headphones fs-16 align-middle me-2"></i>
                  Support
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/SignIn" className="d-flex">
                  <i className="fe fe-power fs-16 align-middle me-2"></i>Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <div className="header-element right-sidebar">
              <Link
                to="#rightside"
                className="header-link right-sidebar"
                onClick={handleShow}
              >
                <i className="fe fe-align-right header-icons header-link-icon d-xl-block d-none"></i>
              </Link>

              <div className="sidebar sidebar-right sidebar-animate  d-xl-flex d-none">
                <Offcanvas
                  placement="end"
                  show={show}
                  onHide={handleClose}
                  id="right-sidebar-canvas"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Todo</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="p-0">
                    <Rightside />
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </div> */}

            <div className="header-element">
              <Link
                to="#switcher"
                className="header-link switcher-icon"
                onClick={handleSwitcherClick}
              >
                {" "}
                <i className="fe fe-settings header-link-icon"></i>{" "}
              </Link>
              <Switcher
                show={showSwitcher}
                onClose={() => setShowSwitcher(false)}
              />
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Header);
