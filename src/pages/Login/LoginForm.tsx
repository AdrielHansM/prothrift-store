import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/Firebase/authService";
import { Button, Form } from "react-bootstrap";
import "../../assets/styles/login.css";
import UserData from "../../models/User";
import { auth } from "../../services/Firebase/firebaseApp";
import { fetchUser } from "../../services/Firebase/productService";

interface LoginData {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    signIn(formData.email, formData.password).then(async () => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const user = (await fetchUser(uid)) as UserData;
        navigate("/home", { state: user });
      }
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="loginCon">
        <h1 className="log-con">{"Welcome!"}</h1>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="mb-3"
            type={"email"}
            name="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="mb-3"
            type={"password"}
            name="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" className="btnlog">
          {"Login"}
        </Button>
      </Form>
    </>
  );
}
