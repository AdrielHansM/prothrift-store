import { ChangeEvent, FormEvent, useState } from 'react';
import ProfileNav from '../../User/ProfileNav'
import { Form, Container, Card} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import UserData from '../../../models/User';

export default function AddProductForm(){
	const state = useLocation().state as UserData;
	console.log(state)
	
	const handleSubmit = (data: FormEvent<HTMLFormElement>) => {
		data.preventDefault();
		console.log(state.userId)
		console.log(data)
	}
  
		return(
		<>
		<ProfileNav/>
		<Container className="mainregCon">
			<Card>
				<Card.Body>
					<Form onSubmit={handleSubmit} className="productForm">
						<h1>Add Product</h1>
						<Form.Group className='mt-3'>
							<Form.Label>Product Name</Form.Label>
							<Form.Control type={'text'} name="productName" placeholder="Product name..." />
						</Form.Group>

						<Form.Group className='mt-3'>
							<Form.Label>Product Price</Form.Label>
							<Form.Control type={'number'} name="productPrice" placeholder="Product price..." />
						</Form.Group>

						<Form.Group className='mt-3'>
							<Form.Label>Product Description</Form.Label>
							<Form.Control type={'textarea'} name="productDescription" placeholder="Product description..." />
						</Form.Group>

						<Form.Group className='mt-3'>
							<Form.Label>Preferred Meetup</Form.Label>
							<Form.Control type={'text'} name="meetupLocation" placeholder="Meetup..." />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Product Image</Form.Label>
							<Form.Control type="file" />
						</Form.Group>
					</Form>
				</Card.Body>
      </Card>
    </Container>
		</>
	)
}