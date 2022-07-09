import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Product from "../../../models/Product";
import UserData from "../../../models/User";
import { createProduct } from "../../../services/Firebase/productService";
import Footer from "../../Components/Footer";
import Loading from "../../Components/LoadingScreen";
import Navigation from "../../Components/NavBar";

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

export default function EditListedProduct() {
  const userDetails = useLocation().state as UserData;

  const imageRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Product>(initialProduct);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [weight] = useState(0);

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  if (userDetails === null || userDetails === undefined) {
    window.location.href = "/profile";
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    if (imageRef.current?.files) {
      setLoading(false);
      const image = imageRef.current.files[0];

      if (image.size < 2000000) {
        const createProductStatus = await createProduct(
          userDetails.userId,
          formData.productName,
          Math.floor(formData.productPrice),
          weight,
          formData.productDescription,
          formData.meetup,
          category,
          status,
          image
        );
        if (createProductStatus) {
          setLoading(createProductStatus);
          setShow(true);
        }
      } else {
        return <Alert variant="danger">Image size is too large</Alert>;
      }
    }
  };

  function SuccessAlert() {
    return (
      <div className="w-75 h-50 mx-auto d-block mt-3">
        <Alert show={show} variant="success">
          <Alert.Heading>Product Updated Successfully</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {loading === false ? (
        <>
          <Navigation />
          <Loading />
        </>
      ) : (
        <>
          <Navigation />
          <SuccessAlert />
          <Container className="mainregCon">
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit} className="productForm">
                  <h1>Edit Product</h1>
                  <Form.Group className="mt-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type={"text"}
                      name="productName"
                      placeholder="Product name..."
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
                        onChange={handleChange}
                        min={0}
                        required
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="productDescription"
                      placeholder="Product description..."
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                      name="image"
                      type="file"
                      id="image-file"
                      ref={imageRef}
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Preferred Meetup</Form.Label>
                    <Form.Control
                      type={"text"}
                      name="meetup"
                      placeholder="Meetup..."
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Product Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={status}
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

                  <Button type="submit" className="w-100 mt-4 mb-3">
                    Save Product
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}
