import React, { useContext, useEffect, useReducer } from 'react'
import '../styles/placeorder.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Store } from '../Store'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify'
import {getError} from '../utils'
import axios from 'axios'
import LoadingBox from '../components/LoadingBox'


const reducer = (state, action) => {
    switch(action.type) {
        case 'CREATE_REQUEST':
            return {...state, loading: true};
        case 'CREATE_SUCCESS':
            return {...state, loading: false};
        case 'CREATE_FAIL':
            return {...state, loading: false};
        default:
            return state;
    }
}

const PlaceOrder = () => {
    const navigate = useNavigate();

    const [{loading}, dispatch] = useReducer(reducer, {
        loading: false,
    });

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart, userInfo} = state;

    //tổng cộng giá đơn hàng
    const roundPrice = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    cart.itemsPrice = roundPrice(
        cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? roundPrice(0) : roundPrice(10);
    cart.taxPrice = roundPrice(0.20 * cart.itemsPrice); //tự cho
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    //thiết lập function tổng đơn hàng
    const placeOrderHandler = async () => {
        try{
            dispatch({type: 'CREATE_REQUEST'});
            const {data} = await axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            ctxDispatch({type: 'CART_CLEAR'});
            dispatch({type: 'CREATE_SUCCESS'});
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
        }catch(err) {
            dispatch({type: 'CREATE_FAIL'});
            toast.error(getError(err));
        }
    };

    useEffect(() => {
        if(!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart, navigate]);

  return (
    <>
        <Navbar />
            <div className='order-container'>
                <div className='order-row'>
                    <div className='order-col'>
                        <h2 className='order-title'>Đánh giá đơn hàng</h2>
                    </div>
                    <div className='order-col'>
                        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
                    </div>
                </div>
                <div className='order-row'>
                    <div className='order-col'>
                        <div className='order-shipping'>
                            <h2 className='order-shipping-title'>Vận chuyển</h2>
                            <p className='order-shipping-info'>{cart.shippingAddress.fullName}, {cart.shippingAddress.address}, 
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.city}, {cart.shippingAddress.country} 
                            <Link to="/shipping"><FontAwesomeIcon icon={faPencil}/>Chỉnh sửa</Link></p>
                        </div>
                        <div className='order-payment'>
                            <h4>Thanh toán</h4>
                            <span>{cart.paymentMethod}</span>
                        </div>
                        <div className='order-items'>
                            <h4 className='order-items-title'>Đơn hàng</h4>
                            <div className='order-cards'>
                                {cart.cartItems.map((item) => (
                                    <div className='order-card'>
                                        <div className='order-card-body'>
                                            <img src={item.image} alt={item.name}/>
                                            <Link to={`product/${item.slug}`}>{item.title}</Link>
                                        </div>
                                        <div className='order-card-footer'>
                                            <span>{item.quantity}</span>
                                            <span>${item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>                
                            <Link className='order-edit' to="/cart"><FontAwesomeIcon icon={faPencil}/>Chỉnh sửa</Link>
                        </div>
                    </div>
                    <div className='order-col'>
                        <h2 className='order-summary'>Tổng đơn hàng</h2>
                        <div className='order-summary-info'>
                            <h4>Đơn hàng</h4>
                            <span>${cart.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className='order-summary-info'>
                            <h4>Vận chuyển</h4>
                            <span>${cart.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className='order-summary-info'>
                            <h4>Thuế</h4>
                            <span>${cart.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className='order-summary-info'>
                            <h3>Tổng cộng</h3>
                            <span>${cart.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='order-summary-button'>
                            <button type='button' onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Đặt hàng</button>
                        </div>
                        {loading && <LoadingBox></LoadingBox>}
                    </div>
                </div>
            </div>
        <Footer />
    </>
  )
}

export default PlaceOrder