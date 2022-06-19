import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Product from "../../../models/Product";
import UserData from "../../../models/User";
import { createProduct } from "../../../services/Firebase/firestoreService";
import { estimateWeight, convertWeight } from "../../../utils/productUtils";
import Footer from "../../Components/Footer";
import Loading from "../../Components/LoadingScreen";
import Navigation from "../../Components/Navigation";

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
  const [clothingType, setClothingType] = useState("");

  const [metric, setMetric] = useState("g");
  const [convertedWeight, setConvertedWeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  if (state === null || state === undefined) {
    window.location.href = "/home";
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
          state.userId,
          formData.productName,
          formData.productPrice,
          formData.productWeight,
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

  useEffect(() => {
    if (category && clothingType) {
      setWeight(estimateWeight(category, clothingType));
    }

    if (metric === "g") {
      setConvertedWeight(weight);
    }

    if (metric != "g") {
      setConvertedWeight(convertWeight(metric, weight));
    }
  });

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
                      <option value="" disabled>
                        Please Select...
                      </option>
                      <option>Mens</option>
                      <option>Womens</option>
                      <option>Kids</option>
                      <option>Accessories</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Clothing Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={clothingType}
                      onChange={(e) => {
                        setClothingType(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Please Select...
                      </option>
                      <option disabled>Upperwear</option>
                      <hr />
                      <option>Shirt</option>
                      <option>T-Shirt</option>
                      <option>Hoodie</option>
                      <option>Sweater</option>
                      <option>Hoodie</option>
                      <option>Jacket</option>
                      <option>Vest</option>
                      <option disabled>Bottomwear</option>
                      <hr />
                      <option>Pant</option>
                      <option>Jean</option>
                      <option>Short</option>
                      <option>Legging</option>
                      <option>Underpant</option>
                      <option>Skirt</option>
                      <option disabled>Accessories</option>
                      <hr />
                      <option>Wallet</option>
                      <option>Belt</option>
                      <option>Hat</option>
                      <option>Scarf</option>
                      <option>Tie</option>
                      <option>Bag</option>
                      <option>Travel Bag</option>
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
                      <option value="" disabled>
                        Please Select...
                      </option>
                      <option>Like New</option>
                      <option>Used with Care</option>
                      <option>Used Frequently</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Estimated Weight (grams)</Form.Label>
                    <InputGroup>
                      <DropdownButton
                        variant="outline-secondary"
                        title={metric}
                        id="input-group-dropdown-1"
                        onSelect={(e: any) => {
                          setMetric(e);
                        }}
                      >
                        <Dropdown.Item eventKey={"g"}>Grams (g)</Dropdown.Item>
                        <Dropdown.Item eventKey={"lbs"}>
                          Pounds (lbs)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={"kg"}>
                          Kilograms (kg)
                        </Dropdown.Item>
                      </DropdownButton>
                      <Form.Control
                        disabled
                        type={"text"}
                        name="productWeight"
                        value={convertedWeight}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button type="submit" className="w-100 mt-4 mb-3">
                    Create Product
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
