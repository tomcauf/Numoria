import '../css/Footer.css';

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="textButton">
            <i className="fas fa-contact"></i>
            <p>Contact</p>
          </div>
          <div className="textButton">
            <i className="fas fa-support"></i>
            <p>Support</p>
          </div>
          <div className="textButton">
            <i className="fas fa-code"></i>
            <p>Github</p>
          </div>
          <div className="textButton">
            <i className="fas fa-security"></i>
            <p>Security</p>
          </div>
          <div className="textButton">
            <i className="fas fa-privacy"></i>
            <p>Privacy</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;