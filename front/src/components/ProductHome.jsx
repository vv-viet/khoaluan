import { faEye, faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import "../styles/producthome.css";
import Quick from './Quick';

const ProductHome = ({item}) => {

  const [open, setOpen] = useState(false);

  //thêm vào giỏ hàng
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, wish} = state;
  //thêm giỏ hàng
    const addToCartHandler = async () => {
      const existItem = cart.cartItems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;   //nếu có sp thì mới thêm vào giỏ

        const {data} = await axios.get(`/api/products/slug/${item.slug}`);
        if(data.countInStock < quantity) {
            window.alert('Xin lỗi. Sản phẩm không tồn tại!');
            return;
        }  

        ctxDispatch({
        type: "CART_ADD_ITEM", 
        payload: { ...item, quantity },
        });
    };
    //thêm mục yêu thích
    const addToWishHandler = () => {
      const existItem = wish.wishItems.find((x) => x._id === item._id);
      const quantity = existItem ? existItem.quantity : 1;    

        // const {data} = await axios.get(`/api/products/slug/${product.slug}`);
        if(existItem) {
            window.alert('Xin lỗi. Bạn đã bỏ vào giỏ yêu thích rồi!');
            return;
        }

      ctxDispatch({
      type: "WISH_ADD_ITEM", 
      payload: { ...item, quantity },
      });
    };

  
  return (
    <div className='hp-card'>
        <div className='card-header'>
          <Link to={`/product/${item.slug}`}>
            <img src={item.image} alt={item.title} />
          </Link>
        </div>
        <div className='card-body'>
            <h3 className='title'>{item.title}</h3>
            <span>${item.price}</span>
        </div>
        <div className='card-footer'>
            <button onClick={() => setOpen(true)} className="eye"><FontAwesomeIcon icon={faEye} /></button>
            <button><FontAwesomeIcon icon={faHeart} onClick={addToWishHandler} /></button>
            {item.countInStock === 0 ? (
              <button className='cart cart-out' disabled>SẢN PHẨM HẾT HÀNG</button>
            ) : (
              <button><FontAwesomeIcon icon={faShoppingBag} onClick={addToCartHandler} /></button>
            )}
        </div>
        {open && <Quick item={item} />}
    </div>
  )
}

export default ProductHome