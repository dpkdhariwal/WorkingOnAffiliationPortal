import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


const Backtotop = () => {

  const [BacktoTop, setBacktopTop] = useState("d-flex"); // Set an initial value, e.g., 'd-none' to hide the button

useEffect(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setBacktopTop('d-block');
    } else {
      setBacktopTop('d-none');
    }
  });

  // Cleanup the event listener when the component unmounts
  return () => {
    window.removeEventListener("scroll", () => { });
  }
}, []);

const screenup = () => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Use 'smooth' for a smooth scroll effect
};
  return (
    <Fragment>
      <Button className={`scrollToTop ${BacktoTop}`} onClick={screenup}>
        <i className="fe fe-arrow-up fs-14 pr-10"></i>
      </Button>
    </Fragment>
  )
}

export default Backtotop;
