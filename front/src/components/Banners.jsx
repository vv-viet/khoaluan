import { faArrowRightArrowLeft, faCheckCircle, faPhoneVolume, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../styles/banners.css"

const Banners = () => {
  return (
    <div className='b-container'>
        <div className='b-row'>
            <div className='b-col'>
                <FontAwesomeIcon icon={faCheckCircle}/>
                <span>Sản phẩm chất lượng</span>
            </div>
            <div className='b-col'>
                <FontAwesomeIcon icon={faTruckFast}/>
                <span>Miễn phí giao hàng</span>
            </div>
            <div className='b-col'>
                <FontAwesomeIcon icon={faArrowRightArrowLeft}/>
                <span>Sales trong tháng</span>
            </div>
            <div className='b-col'>
                <FontAwesomeIcon icon={faPhoneVolume}/>
                <span>Hỗ trợ 24/7</span>
            </div>
            
        </div>
    </div>
  )
}

export default Banners