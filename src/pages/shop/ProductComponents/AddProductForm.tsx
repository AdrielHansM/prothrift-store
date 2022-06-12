import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { Form, Container, Card} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Navigation from '../../Components/Navigation';
import UserData from '../../../models/User';
import Product from '../../../models/Product';
import { createProduct } from '../../../services/Firebase/firestoreService';

const initialProduct = {
	productName: '',
	productPrice: 0,
	productDescription: '',
	imageUrl: '',
	meetup: '',
	category: '',
	status: '',
	isDeleted: false,
	isSold: false,
	dateCreated: new Date(),
	dateUpdated: new Date()
}

export default function AddProductForm(){
	const [inputFile, setInputFile] = useState<HTMLInputElement | null>(null);
	const [formData, setFormData] = useState<Product>(initialProduct);

  useEffect(() => {
    setInputFile(document.getElementById("image-file") as HTMLInputElement);
  }, []);

	const [category, setCategory] = useState("");
	const [status, setStatus] = useState("");

	const state = useLocation().state as UserData;
	console.log(state)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}
	
	const handleSubmit = (data: FormEvent<HTMLFormElement>) => {
		data.preventDefault();
		if (inputFile) {
			// createProduct(formData.productName, formData.productPrice, formData.productDescription, formData.meetup, status, inputFile);
			
		}
		console.log(state.userId)
		console.log(data)
	}
	
	return(
	<>
	<Navigation/>
		<Container className="mainregCon">
			<Card>
				<Card.Body>
					<Form onSubmit={handleSubmit} className="productForm">
						<h1>Add Product</h1>
						<Form.Group className='mt-3'>
							<Form.Label>Product Name</Form.Label>
							<Form.Control type={'text'} name="productName" placeholder="Product name..."   onChange={handleChange} />
						</Form.Group>

						<Form.Group className='mt-3'>
							<Form.Label>Product Price</Form.Label>
							<Form.Control type={'number'} name="productPrice" placeholder="Product price..."  onChange={handleChange} />
						</Form.Group>

						<Form.Group className='mt-3'>
							<Form.Label>Product Description</Form.Label>
							<Form.Control as="textarea" rows={3} name="productDescription" placeholder="Product description..."  onChange={handleChange} />
						</Form.Group>

						<Form.Group className="mt-3">
							<Form.Label>Product Image</Form.Label>
							<Form.Control name="image" type="file" id="image-file" />
						</Form.Group>

						<Form.Group className='mt-3'>
							<Form.Label>Preferred Meetup</Form.Label>
							<Form.Control type={'text'} name="meetup" placeholder="Meetup..."  onChange={handleChange} />
						</Form.Group>

						<Form.Group className='mt-3'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								as = "select"
								value={category}
								onChange={e => {
									setCategory(e.target.value);
								}}
							 >
								<option>Mens</option>
								<option>Womens</option>
								<option>Kids</option>
								<option>Accessories</option>
							</Form.Control>
						</Form.Group>

						<Form.Group className='mt-3'>
							<Form.Label>Product Status</Form.Label>
							<Form.Control
								as = "select"
								value={status}
								onChange={e => {
									setStatus(e.target.value);
								}}
							 >
								<option>Brand New</option>
								<option>Used with Care</option>
								<option>Used Frequently</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</Container>
		</>
	)
}