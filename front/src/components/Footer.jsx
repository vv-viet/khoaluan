import React from 'react'
import "../styles/footer.css"
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='f-container'>
        <div className='f-row'>
            <div className='f-col'>
                <img src='/images/logo/logo.png' alt=''/>
                <p>Mang sản phẩm tuyệt vời nhất đến người tiêu dùng.</p>
            </div>
            <div className='f-col'>
                <h2>Truy cập nhanh</h2>
                <ul>
                    <li>
                        <NavLink to="/">Trang chủ</NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop">Sản phẩm</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">Chúng tôi</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Liên hệ</NavLink>
                    </li>
                </ul>
            </div>
            <div className='f-col'>
                <h2>Loại sản phẩm</h2>
                <ul>
                    <li>
                        <NavLink to="/">Nam</NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop">Vest</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">Nữ</NavLink>
                    </li>
                </ul>
            </div>
            <div className='f-col'>
                <h2>Đồng hành cùng chúng tôi</h2>
                <div className='socials'>
                    <a href='/'><img src='/images/socials/facebook.png' alt=''/></a>
                    <a href='/'><img src='/images/socials/youtube.png' alt=''/></a>
                    <a href='/'><img src='/images/socials/twitter.png' alt=''/></a>
                    <a href='/'><img src='/images/socials/instagram.png' alt=''/></a>
                </div>
            </div>
        </div>
        <div className='f-copyrow'>
            <p>&copy; 2022. Bản quyền được xét duyệt. Thiết kế bởi Dang Van Viet</p>
        </div>
    </div>
  )
}

export default Footer