import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Store } from '../Store';
import "../styles/quick.css"

const Quick = ({item}) => {

    //thay doi hình
    const [selectedImage, setSelectedImage] = useState('');
    //Up nhiều hình
    const [style, setStyle] = useState("main-container");
    const changeStyle = () => {
        setStyle("main-containerOne");
    };


    // function thêm vào giỏ hàng
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
    const existItem = wish.wishItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity : 1;    

        // const {data} = await axios.get(`/api/products/slug/${product.slug}`);
        if(existItem) {
            window.alert('Xin lỗi. Bạn đã bỏ vào giỏ yêu thích rồi!');
            return;
        }

    const addToWishHandler = () => {
      ctxDispatch({
      type: "WISH_ADD_ITEM", 
      payload: { ...item, quantity },
      });
    };



    return (
        <div className={style}>
            <div className='card-quick' key={item._id}>
                <div className='card-row'>
                    <div className='card-images'>
                        <div className='card-top'>
                            <img src={selectedImage || item.image} alt={item.title} />
                        </div>
                        <div className='card-bottom'>
                            <img src={item.image} onClick={() => setSelectedImage(`${item.image}`)} alt={item.title} />
                            <img src={item.image1} onClick={() => setSelectedImage(`${item.image1}`)} alt={item.title} />
                            <img src={item.image2} onClick={() => setSelectedImage(`${item.image2}`)} alt={item.title} />
                            <img src={item.image3} onClick={() => setSelectedImage(`${item.image3}`)} alt={item.title} />
                        </div>
                    </div>
                </div>
                <div className='card-row'>
                    <div className='first-div div'>
                        <h2 className='title'>{item.title}</h2>
                        <p className='cateogry'>{item.category}</p>
                    </div>
                    <div className='second-div div'>
                        <span className='price'>Giá: ${item.price}</span>
                        <div className='quantity'>Số lượng: 1</div>
                    </div>
                    <div className='third-div div'>
                        <p className='desc'>{item.desc}</p>
                    </div>
                    <div className='fourth-div div'>
                        {item.countInStock === 0 ? (
                            <button className='cart cart-out' disabled>SẢN PHẨM HẾT HÀNG</button>
                        ) : (
                            <button className='cart' onClick={addToCartHandler}>Thêm vào giỏ hàng</button>
                        )}               
                        <button className='wish' onClick={{addToWishHandler}}>Thêm vào yêu thích</button>
                    </div>
                </div>
            </div>
            <button className='back' onClick={changeStyle}>Đóng</button>
        </div>
    )
}

export default Quick