import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links_div">
            <h4>Navigation</h4>
              <Link to="/">
                <p>Home</p>
              </Link>
            <Link to="/get-all/artists">
              <p>All Artists</p>
            </Link>
              
            <Link to="/get-all/albums">
              <p>All Albums</p>
            </Link>
          </div>
          <div className="sb_footer-links_div">
            <h4>Developer</h4>
            <a href="https://github.com/jud3v2" target="_blank" rel="noopener noreferrer">
              <p>Jud3v2</p>
            </a>
            <a href="https://github.com/MedCy1" target="_blank" rel="noopener noreferrer">
              <p>MedCy1</p>
            </a>
            <a href="https://github.com/Zuuux" target="_blank" rel="noopener noreferrer">
              <p>Zuux</p>
            </a>
            <a href="https://github.com/Kisuk1" target="_blank" rel="noopener noreferrer">
              <p>Kisuke.1</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>technology</h4>
            <a href="https://fr.legacy.reactjs.org/" target="_blank" rel="noopener noreferrer">
              <p>React.jsx</p>
            </a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
              <p>PTailwind CSS</p>
            </a>
            <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">
              <p>Docker</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Social networks</h4>
            <a href="https://www.instagram.com/spotify/" target="_blank" rel="noopener noreferrer">
              <p>Instagram</p>
            </a>
          </div>
        </div>
        <hr></hr>
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@{new Date().getFullYear()} Le retour. All right reserved</p>
          </div>
          <div className="sb_footer-below-links">
            <div>
              <p>Terms & Conditions</p>
            </div>

            <div>
              <p>Privacy</p>
            </div>

            <div>
              <p>Security</p>
            </div>

            <div>
              <p>Cookie Declaration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
