import React from 'react'
import '../styles/checkoutsteps.css'

const CheckoutSteps = (props) => {
  return (
    <div className='checkout-steps'>
        <p className={props.step1 ? 'active' : ''}>Đăng nhập</p>
        <p className={props.step2 ? 'active' : ''}>Vận chuyển</p>
        <p className={props.step3 ? 'active' : ''}>Thanh toán</p>
        <p className={props.step4 ? 'active' : ''}>Địa điểm giao</p>
    </div>
  )
}

export default CheckoutSteps