import { FormEvent, useState, ChangeEvent, useEffect, useRef } from "react";
import {
  Form,
  Container,
  Card,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Navigation from "../../Components/Navigation";
import UserData from "../../../models/User";
import Product from "../../../models/Product";
import { createProduct } from "../../../services/Firebase/firestoreService";
import Loading from "../../Components/LoadingScreen";

const initialProduct = {
  productId: "",
  userId: "",
  productName: "",
  productPrice: 0,
  productDescription: "",
  imageUrl: "",
  meetup: "",
  category: "",
  status: "",
  isDeleted: false,
  isSold: false,
  dateCreated: new Date(),
  dateUpdated: new Date(),
};

export default function AddProductForm() {
  const state = useLocation().state as UserData;

  const imageRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Product>(initialProduct);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    if (imageRef.current?.files) {
      setLoading(false);
      const image = imageRef.current.files[0];
      const createStatus = await createProduct(
        state.userId,
        formData.productName,
        formData.productPrice,
        formData.productDescription,
        formData.meetup,
        category,
        status,
        image
      );
      if (createStatus) {
        setLoading(createStatus);
        setShow(true);
      }
    }
  };

  function SuccessAlert() {
    return (
      <div className="w-75 h-50 mx-auto d-block mt-3">
        <Alert show={show} variant="success">
          <Alert.Heading>Product Successfully Listed</Alert.Heading>
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
        <Loading />
      ) : (
        <>
          <Navigation />
          <SuccessAlert />
          <Container className="mainregCon">
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit} className="productForm">
                  <h1>Add Product</h1>
                  <Form.Group className="mt-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type={"text"}
                      name="productName"
                      placeholder="Product name..."
                      onChange={handleChange}
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
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <option>Mens</option>
                      <option>Womens</option>
                      <option>Kids</option>
                      <option>Accessories</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Product Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option>Used with Care</option>
                      <option>Used Frequently</option>
                    </Form.Control>
                  </Form.Group>

                  <Button type="submit" className="w-100 mt-4 mb-3">
                    Create Product
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </>
      )}
    </>
  );
}
