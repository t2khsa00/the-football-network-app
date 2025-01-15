import './Footer.css'; // For custom footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <img src="/FootBallNetWork.png" alt="Logo" className="logo-img" />
          <p className="footer-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>OUR SERVICES</h4>
            <ul>
              <li><a href="#">Knowledge Base</a></li>
              <li><a href="#">Hire An Expert</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>QUICK LINKS</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>RESOURCES</h4>
            <ul>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>IMPORTANT LINKS</h4>
            <ul>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="footer-bottom">
        <p>Phone: +1 916-875-2323 | Email: info@website.com</p>
        <p>Website: www.website.com</p>
      </div>
    </footer>
  );
};

export default Footer;
