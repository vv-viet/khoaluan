import React, { useContext, useEffect, useReducer } from 'react'
import Footer from './Footer'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import Navbar from './Navbar'
import '../styles/orderdetails.css'
import { Store } from '../Store'
import { useNavigate, useParams } from 'react-router-dom'
import { getError } from '../utils'
import axios from 'axios'


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

const OrderDetails = () => {

    const {state} = useContext(Store);
    const {userInfo} = state;

    const params = useParams();
    const {id: orderId} = params;
    const navigate = useNavigate();

    const [{ loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/orders/${orderId}`, {
                    headers: {authorization: `Bearer ${userInfo.token}`},
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data});                
            }catch(err) {
                dispatch({type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        if(!userInfo) {
            return navigate('/login');
        }
        if(!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [order, userInfo, orderId, navigate]);

  return (
    loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox>{error}</MessageBox>) : (
        <>
            <Navbar />
                <div className='order-details-container'>
                    <div className='order-details-row'>
                        <div className='order-details-col'>
                            <h2 className='order-details-title'>Đơn hàng của bạn</h2>
                            <h4 className='order-details-subtitle'>ID Đơn hàng: {orderId}</h4>
                        </div>
                    </div>
                    <div className='order-row'>
                        <div className='order-col'>
                            <div className='order-shipping'>
                                <h2 className='order-shipping-title'>Vận chuyển</h2>
                                <p className='order-shipping-info'>{order.shippingAddress.fullName}, {order.shippingAddress.address}, 
                                {order.shippingAddress.postalCode}, {order.shippingAddress.city}, {order.shippingAddress.country} 
                                </p>
                                {order.isPaid ? (<span>Thanh toán tại {order.deliveredAt}</span>) : (
                                    <span>Không vận chuyển</span>
                                )}
                            </div>
                            <div className='order-payment'>
                                <h4>Thanh toán</h4>
                                <span>{order.paymentMethod} - </span>
                                {order.isPaid ? (<span>Thanh toán tại {order.paidAt} </span>) : (
                                    <span>Không thanh toán <br /><span className='after'>* Bạn sẽ thanh toán sau khi giao hàng</span></span>
                                )}                    
                            </div>
                            <div className='order-items'>
                                <h4 className='order-items-title'>Đơn hàng</h4>
                                <div className='order-cards'>
                                    {order.orderItems.map((item) => (
                                        <div className='order-card'>
                                            <div className='order-card-body'>
                                                <img src={item.image} alt={item.name}/>                                              
                                            </div>
                                            <div className='order-card-footer'>
                                                <span>{item.quantity}</span>
                                                <span>${item.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>                
                            </div>
                        </div>
                        <div className='order-col'>
                            <h2 className='order-summary'>Tổng đơn hàng</h2>
                            <div className='order-summary-info'>
                                <h4>Đơn hàng</h4>
                                <span>${order.itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className='order-summary-info'>
                                <h4>Vận chuyển</h4>
                                <span>${order.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className='order-summary-info'>
                                <h4>Thuế</h4>
                                <span>${order.taxPrice.toFixed(2)}</span>
                            </div>
                            <div className='order-summary-info'>
                                <h3>Tổng cộng</h3>
                                <span>${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
  )
}

export default OrderDetails