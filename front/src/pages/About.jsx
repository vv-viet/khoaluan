import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/about.css"

const About = () => {
  return (
    <div>
      <Navbar />
        <div className='wrapper'>
          <div className='background-container'>
            <div className='bg-1'></div>
            <div className='bg-2'></div>
          </div>
          <div className='about-container'>
            <div className='image-container'>
            <img src="https://i.ibb.co/YZymjFz/kisspng-e-commerce-clip-art-shopping-cart-software-online-why-you-should-choose-magento-enterprise-o.jpg" alt="kisspng-e-commerce" border="0"/>
            </div>
            <div className='text-container'>
              <h2>CHÚNG TÔI</h2>
              <p> Với tiêu chí không tập trung bề rộng, mà tập trung vào chiều sâu, 
              mong muốn mang đến cho khách hàng các sản phẩm ngày càng chỉn chu và tinh tế hơn, 
              để hy vọng rằng bạn luôn tự tin khi mua sản phẩm từ chúng tôi.</p>
              <button>KHÁM PHÁ NGAY</button>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default About