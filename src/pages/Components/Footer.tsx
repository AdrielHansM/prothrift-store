import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                <i>ProThrift.com</i> a secondhand shopping platform with a mission to empower people in
          their daily lives.
              </p>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li>
                  <a href="/shop-men">Men</a>
                </li>
                <li>
                  <a href="/shop-women">Women</a>
                </li>
                <li>
                  <a href="/shop-kids">Kids</a>
                </li>
                <li>
                  <a href="/shop-accessories">Accessories</a>
                </li>
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li
                  onClick={() => navigate("/about")}
                  style={{ cursor: "pointer" }}
                >
                  About Us
                </li>
                <li
                  onClick={() => navigate("/contact")}
                  style={{ cursor: "pointer" }}
                >
                  Contacts
                </li>
                <li
                  onClick={() => navigate("#")}
                  style={{ cursor: "pointer" }}
                >
                  Privacy Policy
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2022 All Rights Reserved by
                <a href="/home"> ProThrift </a>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="https://www.facebook.com/">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="instagram" href="https://www.instagram.com/?hl=en">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
