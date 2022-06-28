import '../../assets/styles/Shop.css';
import Navigation from '../Components/Navigation'
import Footer from "../Components/Footer";

export default function Kids() {


  return (
    <>
    <Navigation/>
    <div>
      <h2 className='productCateg'>Kid's Clothes</h2>
    </div>
    <p style={{fontSize:'50px', textAlign:'center', marginBottom:'20%'}}>No Product Listed</p>
    <Footer />
    </>
  )
}