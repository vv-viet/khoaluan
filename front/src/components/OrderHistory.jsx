import React, { useContext, useEffect, useReducer } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import '../styles/orderhistory.css'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import { Store } from '../Store'
import { Link, useNavigate } from 'react-router-dom'
import { getError } from '../utils'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}


const OrderHistory = () => {

    const {state} = useContext(Store);
    const {userInfo} = state;

    const navigate = useNavigate();

    const [{ loading, error, orders}, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST'});
            try{
                const {data} = await axios.get(
                    `/api/orders/mine`,

                    {headers: { Authorization: `Bearer ${userInfo.token}`} }
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data});
            }catch(error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, [userInfo]);

  return (
    loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox>{error}</MessageBox>) : (
        <>
            <Navbar />
                <div className='orderhistory-container'>
                    <div className='orderhistory-row'>
                        <div className='orderhistory-col'>
                            <h2 className='orderhistory-title'>L???ch s??? ????n h??ng</h2>
                        </div>
                    </div>
                    <div className='orderhistory-row'>
                        <div className='orderhistory-col'>
                            <div className='tables'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NG??Y</th>
                                            <th>T???NG</th>
                                            <th>THANH TO??N</th>
                                            <th>V???N CHUY???N</th>
                                            <th>PH????NG TH???C</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0,10)}</td>
                                                <td>{order.totalPrice.toFixed(2)}</td>
                                                <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</td>
                                                <td> {order.isDelivered ? order.deliveredAt.substring(0,10) : 'No'}</td>
                                                <td>
                                                    <button type='button' variant='light' onClick={() => { navigate(`/order/${order._id}`);}}>
                                                        Chi ti???t
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='account-back'>
                                <Link to='/account'><FontAwesomeIcon icon={faChevronLeft}/> Tr??? v???</Link>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
  )
}

export default OrderHistory