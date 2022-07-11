import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../../../models/Product";
import {
  deleteProduct,
  fetchProductsByProfile,
  fetchSingleProduct,
  updateProduct,
} from "../../../services/Firebase/productService";
import Navigation from "../../Components/NavBar";
import UserData from "../../../models/User";
import "../../../assets/styles/ViewProduct.css";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";

interface stateType {
  product: string;
  user: UserData;
}

const initialProduct = {
  productId: "",
  userId: "",
  productName: "",
  productPrice: 0,
  productWeight: 0,
  productDescription: "",
  imageUrl: "",
  meetup: "",
  category: "",
  status: "",
  isDonated: false,
  isDeleted: false,
  isSold: false,
  dateCreated: new Date(),
  dateUpdated: new Date(),
};

export default function ViewListedProducts() {
  const userDetails = useLocation().state as stateType;
  const [productDetails, setProductDetails] = useState<Product>();
  const [formData, setFormData] = useState<Product>(initialProduct);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(false);

  const [showSave, setShowSave] = useState(false);
  const handleCloseSave = () => setShowSave(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (userDetails.product) {
      fetchProductData(userDetails.product);
      setLoading(false);
    }
  });

  async function fetchProductData(productId: string) {
    const fetchedProduct = await fetchSingleProduct(productId);
    if (fetchedProduct) {
      setProductDetails(fetchedProduct);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const updateProductStatus = await updateProduct(
      "",
      userDetails.user.userId,
      userDetails.product,
      formData.productName,
      Math.floor(formData.productPrice),
      formData.productDescription,
      formData.meetup,
      "",
      0
    ).then(() => {
      setLoading(false);
      setEditProduct(false);
      alert("Product Updated");
    });
  };

  return (
    <>
      {loading ? (
        <>
          <Navigation />
        </>
      ) : (
        <>
          <Navigation />
          <Form onSubmit={handleSubmit} className="sold-btn">
            <section className="details">
              <div className="product-con">
                <img
                  className="product-img"
                  src={productDetails?.imageUrl}
                  style={{ width: "30%", height: "60vh" }}
                  alt=""
                />
                <div className="product-details">
                  {editProduct ? (
                    <>
                      <Form onSubmit={handleSubmit} className="productForm">
                        <h1>Edit Product</h1>
                        <Form.Group className="mt-3">
                          <Form.Label>Product Name</Form.Label>
                          <Form.Control
                            type={"text"}
                            name="productName"
                            placeholder="Product name..."
                            value={
                              formData.productName
                                ? formData.productName
                                : productDetails?.productName
                            }
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mt-3">
                          <Form.Label>Product Price</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>Php</InputGroup.Text>
                            <Form.Control
                              type={"number"}
                              name="productPrice"
                              placeholder="Product price..."
                              value={
                                formData.productPrice
                                  ? formData.productPrice
                                  : productDetails?.productPrice
                              }
                              onChange={handleChange}
                              min={0}
                              required
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group className="mt-3">
                          <Form.Label>Product Status</Form.Label>
                          <Form.Control
                            as="select"
                            value={status ? status : productDetails?.category}
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            required
                          >
                            <option value="" disabled>
                              Please Select...
                            </option>
                            <option>Like New</option>
                            <option>Used with Care</option>
                            <option>Used Frequently</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group className="mt-3">
                          <Form.Label>Preferred Meetup</Form.Label>
                          <Form.Control
                            type={"text"}
                            name="meetup"
                            placeholder="Meetup..."
                            value={
                              formData.meetup
                                ? formData.meetup
                                : productDetails?.meetup
                            }
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mt-3">
                          <Form.Label>Product Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="productDescription"
                            placeholder="Product description..."
                            value={
                              formData.productDescription
                                ? formData.productDescription
                                : productDetails?.productDescription
                            }
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                        <Button
                          type="button"
                          className="m-0 mt-4 w-100"
                          onClick={() => setShowSave(true)}
                        >
                          Save Product
                        </Button>
                      </Form>
                    </>
                  ) : (
                    <>
                      <p className="p-name">{productDetails?.productName}</p>
                      <p className="price">₱{productDetails?.productPrice}</p>
                      <p className="status">
                        Product Status: {productDetails?.status}
                      </p>
                      <p>meeting place: {productDetails?.meetup}</p>
                      <p>
                        Description:
                        <br />
                        {productDetails?.productDescription}
                      </p>
                    </>
                  )}

                  <Button onClick={() => setEditProduct(!editProduct)}>
                    Edit Product
                  </Button>
                  <Button onClick={handleShow}>Delete</Button>
                  <Modal show={show} centered>
                    <Modal.Body
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        padding: "5% 1%",
                      }}
                    >
                      Are you sure you want to remove product?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleClose();
                          deleteProduct(userDetails.product);
                          navigate("/profile", { state: userDetails });
                        }}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={showSave} centered>
                    <Modal.Body
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        padding: "5% 1%",
                      }}
                    >
                      Are you sure you want to save edits?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseSave}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleCloseSave();
                          handleSubmit();
                        }}
                      >
                        Accept
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </section>
          </Form>
          <br />
        </>
      )}
    </>
  );
}
