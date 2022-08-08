import React from 'react'
import "../styles/newsletter.css"

const Newsletter = () => {
  return (
    <div className='new-container'>
        <div className='new-row'>
            <h2 className='new-title'>Bảng tin</h2>
            <p className='new-desc'>Đừng bỏ lỡ sản phẩm yêu thích của bạn</p>
            <div className='input-container'>
                <input type="text" placeholder='Email của bạn'/>
                <button>Gửi thông tin</button>
            </div>
        </div>
    </div>
  )
}

export default Newsletter