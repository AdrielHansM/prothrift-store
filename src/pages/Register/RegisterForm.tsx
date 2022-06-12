import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../services/Firebase/authService';
import { Button, Form } from 'react-bootstrap'
import '../../assets/styles/login.css';


interface RegisterData {
  email: string;
  password: string;
  contactNumber: number;
  firstName: string;
  lastName: string;
}

const initialValues = { 
  email: "", 
  password: "",
  contactNumber: 0,
  firstName: "",
  lastName: "",
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    signUp(formData.firstName, formData.lastName, formData.email, formData.contactNumber, formData.password)
      .then(() => navigate("/login", { state: { register: true } }));
  }
  
  return (
    <>
      <Form onSubmit={handleSubmit} className="registerForm">
        <h1>Register</h1>
        <Form.Group className='mt-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type={'text'} name="firstName" placeholder="First name..." value={formData.firstName} onChange={handleChange} />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type={'text'} name="lastName" placeholder="Last name..." value={formData.lastName} onChange={handleChange} />
        </Form.Group>
        
        <Form.Group className='mt-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control type={'email'} name="email" placeholder="Email..." value={formData.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type={'password'} name="password" placeholder="Password..." value={formData.password} onChange={handleChange} />
        </Form.Group>
        
        <Form.Group className='mt-3'>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control type={'text'} name="contactNumber" placeholder="Contact..." value={formData.contactNumber == 0 ? "" : formData.contactNumber} onChange={handleChange} />
        </Form.Group>

        <Button type='submit' className="w-100 mt-4 mb-3">{'Register'}</Button>
      </Form>
    </>
  )
}