import { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigateTo = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <li 
                  onClick={() => navigateTo("/shop-men")}
                  style={{ cursor: "pointer" }}
                >
                  Men
                </li>
                <li 
                  onClick={() => navigateTo("/shop-women")}
                  style={{ cursor: "pointer" }}
                >
                  Women
                </li>
                <li 
                  onClick={() => navigateTo("/shop-kids")}
                  style={{ cursor: "pointer" }}
                >
                  Kids
                </li>
                <li 
                  onClick={() => navigateTo("/shop-accessories")}
                  style={{ cursor: "pointer" }}
                >
                  Accessories
                </li>
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li
                  onClick={() => navigateTo("/about")}
                  style={{ cursor: "pointer" }}
                >
                  About Us
                </li>
                <li
                  onClick={() => navigateTo("/contact")}
                  style={{ cursor: "pointer" }}
                >
                  Contacts
                </li>
                <li
                  onClick={handleShow}
                  style={{ cursor: "pointer" }}
                >
                  Privacy Policy
                </li>
                <Modal show={show} centered>
                  <Modal.Body
                    style={{
                      textAlign: "center",
                      fontSize: "30px",
                      padding: "10% 5%",
                    }}
                  >
                    <p>PRIVACY STATEMENT</p>
                    <p>1. What do we do with your information?
                    When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
                    With your permission, we may send you emails about our store and other updates.</p>

                    <p>2. Consent</p>

                    <p>2.1 How do you get my consent?
                    When you provide us with personal information to complete a transaction, you consent to our collecting it and using it for that specific reason only.

                    If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</p>

                    <p>2.2 How do I withdraw my consent?
                    If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at prothrift@gmail.com.</p>

                    <p>3. Disclosure
                    We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.

                    PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.</p>

                    <p>4. Security
                    To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>

                    <p>5. Age of consent
                    By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>

                    <p>6. Changes to this privacy policy
                    We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.

                    If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
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
