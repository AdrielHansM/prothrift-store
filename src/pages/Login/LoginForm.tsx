import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../services/Firebase/authService';
import { Button, Form } from 'react-bootstrap'
interface LoginData {
  email: string;
  password: string;
}

interface LoginFormProps {
  register: boolean;
}

const initialValues = { 
  email: "", 
  password: "",
}

export default function LoginForm(props: LoginFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>(initialValues);

  useEffect(() => {
    resetForm();
  }, [props.register])

  const resetForm = () => {
    setFormData(initialValues)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    signIn(formData.email, formData.password)
      .then(() => navigate("/shop"));
    
  }
  
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>{props.register ? 'Register' : 'Welcome'}</h1>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type={'email'} name="email" placeholder="Email..." value={formData.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type={'password'} name="password" placeholder="Password..." value={formData.password} onChange={handleChange} />
        </Form.Group>
        <Button type='submit' className="w-100 mt-4 mb-3">{props.register ? 'Register' : 'Login' }</Button>
      </Form>
    </>
  )
}
