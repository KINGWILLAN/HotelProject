import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 bg-gray-100 text-gray-600 gap-y-10 py-10 px-32">
      <div className="footer-links">
        <h5 className="link-title">ABOUT</h5>
        <Link className="footer-link" to="#">
          <p>How Airbnb works</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Newsroom</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Investors</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Airbnb Luxe</p>
        </Link>
      </div>
      {/*  */}
      <div className="footer-links">
        <h5 className="link-title">COMMUNITY</h5>
        <Link className="footer-link" to="#">
          <p>Accessibility</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>This is not a real site</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Its pretty awesome</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Referrals Accepted</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Jagun</p>
        </Link>
      </div>
      {/*  */}
      <div className="footer-links">
        <h5 className="link-title">HOST</h5>
        <Link className="footer-link" to="#">
          <p>Lorem</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Ipsum</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Presaents</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Donor Ilsum</p>
        </Link>
      </div>
      {/*  */}
      <div className="footer-links">
        <h5 className="link-title">SUPPORT</h5>
        <Link className="footer-link" to="#">
          <p>Developers</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Customers</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Technical Team</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Blocked</p>
        </Link>
        <Link className="footer-link" to="#">
          <p>Open Now</p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
