import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import '../styles/shipping.css'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import CheckoutSteps from './CheckoutSteps'

const Shipping = () => {

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        userInfo,
        cart: {shippingAddress},
    } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if(!userInfo) {
            navigate('/login?redirect=/shipping');
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
        })
        );
        navigate('/payment');
    }


  return (
    <>
        <Navbar />
            <div className='shipping-container'>
                <div className='shipping-row'>
                    <div className='shipping-col'>
                        <h2 className='shipping-title'>Địa chỉ giao hàng</h2>
                    </div>
                    <div className='shipping-col'>
                        <CheckoutSteps step1 step2 ></CheckoutSteps>
                    </div>
                </div>
                <div className='shipping-row'>
                    <div className='shipping-col'>
                        <form onSubmit={submitHandler}>
                            <div className='form-group'>
                                <label htmlFor='name'>Họ tên</label>
                                <input type="text" id='name' required value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='address'>Địa chỉ</label>
                                <input type="text" id='address' required value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='city'>Thành phố</label>
                                <input type="text" id='city' required value={city} onChange={(e) => setCity(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='p_code'>Mã bưu điện</label>
                                <input type="text" id='p_code' required value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='country'>Quốc gia</label>
                                <input type="text" id='country' required value={country} onChange={(e) => setCountry(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <button type='submit'>Tiếp tục</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        <Footer />
    </>
  )
}

export default Shipping