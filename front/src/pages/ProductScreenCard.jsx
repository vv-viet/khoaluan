import React, { useContext, useState } from 'react'
import '../styles/productscreencard.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Store } from '../Store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const ProductScreenCard = ({product}) => {

    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState('');


    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart, wish} = state;
    //thêm sp vào giỏ
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;   //nếu có sp thì mới thêm vào giỏ

        const {data} = await axios.get(`/api/products/slug/${product.slug}`);
        if(data.countInStock < quantity) {
            window.alert('Xin lỗi. Sản phẩm không tồn tại!');
            return;
        }
        ctxDispatch({
        type: "CART_ADD_ITEM", 
        payload: { ...product, quantity },
        });

        navigate('/cart');
    };
    //thêm sp vào yêu thích
    const addToWishHandler = async () => {
        const existItem = wish.wishItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity : 1;    

        // const {data} = await axios.get(`/api/products/slug/${product.slug}`);
        if(existItem) {
            window.alert('Xin lỗi. Bạn đã bỏ vào giỏ yêu thích rồi!');
            return;
        }

        ctxDispatch({
        type: "WISH_ADD_ITEM", 
        payload: { ...product, quantity },
        });

        navigate('/wish');
  };


  return (
    <>
        <Navbar />
        <div className='screen-container'>
            <div className='screen-row'>
                <div className='screen-col'>
                    <div className='screen-images'>
                        <div className='screen-top'>
                            <TransformWrapper>
                                <TransformComponent>
                                    <img src={selectedImage || product.image} alt={product.title} />
                                </TransformComponent>
                            </TransformWrapper>
                            {/* <img src={selectedImage || product.image} alt={product.title} /> */}
                        </div>
                        <div className='screen-bottom'>
                            <img src={product.image} onClick={() => setSelectedImage(`${product.image}`)} alt={product.title} />
                            <img src={product.image1} onClick={() => setSelectedImage(`${product.image1}`)} alt={product.title} />
                            <img src={product.image2} onClick={() => setSelectedImage(`${product.image2}`)} alt={product.title} />
                            <img src={product.image3} onClick={() => setSelectedImage(`${product.image3}`)} alt={product.title} />
                        </div>
                    </div>
                </div>
                <div className='screen-col'>
                    <div className='first-div div'>
                        <h2 className='title'>{product.title}</h2>
                        <p className='cateogry'>{product.category}</p>
                    </div>
                    <div className='second-div div'>
                        <span className='price'>Giá: ${product.price}</span>
                        <div className='quantity'>Số lượng: 1</div>
                    </div>
                    <div className='third-div div'>
                        <p className='desc'>{product.desc}</p>
                    </div>
                    <div className='fourth-div div'>
                        {product.countInStock === 0 ? (
                            <button className='cart cart-out' disabled>SẢN PHẨM HẾT HÀNG</button>
                        ) : (
                            <button className='cart' onClick={addToCartHandler}>Thêm vào giỏ hàng</button>
                        )}
                        
                        <button className='wish' onClick={addToWishHandler}>Thêm vào yêu thích</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
    
  )
}

export default ProductScreenCard