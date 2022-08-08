import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import '../styles/userprofile.css'
import { getError } from '../utils';
import Footer from './Footer';
import Navbar from './Navbar';
import {toast} from 'react-toastify'


function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };

        default:
            return state;
    }
}


const UserProfile = () => {

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            //xuat ra dữ liệu mới khi nhập vào
            const {data} = await axios.put(
                '/api/users/profile',
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}`},
                }
            );
            //cập nhật thành công
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data)); //thiết lập dữ liệu người dùng
            toast.success('Thông tin cập nhật thành công');
        } catch(err){
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error(getError(err));
        }
    }

  return (
    <>
        <Navbar />
            <div className='signin-container'>
                <div className='signin-row'>
                    <div className='signin-col'>
                        <form onSubmit={submitHandler}>
                            <h2>THÔNG TIN CÁ NHÂN</h2>
                            <div className='form-group'>
                                <label htmlFor='name'>Tên đăng nhập</label>
                                <input type="text" id='name' value={name} required onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>E-mail</label>
                                <input type="email" id='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Mật khẩu</label>
                                <input type="password" id='password' required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='c_password'>Nhập lại Mật khẩu</label>
                                <input type="password" id='c_password' required onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <button type='submit'>Cập nhật</button>
                            </div>
                            <div className='account-back'>
                                <Link to='/account'><FontAwesomeIcon icon={faChevronLeft}/> Trở về</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        <Footer />
    </>
  )
}

export default UserProfile