import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import Robot from "./Robot";

const Footer = () => {
  const date = new Date();
  const CurrentYear = date.getFullYear();
  return (
    <>
      <Robot />
      <footer className="footer">
        <div className="footer__container">
          <div className="Footer1">&copy; {CurrentYear} HeritEdge</div>
          <div className="Footer2">
            <p>Condition of Use Privacy Notice Your Ads Privacy Choice</p>
            <p>&copy; {CurrentYear} HeritEdge || All Rights Reserved.</p>
          </div>
          <div className="Footer3">
            <p>
              <h3 className="circle"> </h3> <Link to="/About">About us</Link>
            </p>
            <p>
              <h3 className="circle"> </h3> <Link to="/Feedback">Feedback</Link>
            </p>
            <p>
              <h3 className="circle"> </h3> <Link to="/About">Contact</Link>
            </p>
            <p>
              <h3 className="circle"> </h3> <Link to="/FAQ">FAQ</Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
