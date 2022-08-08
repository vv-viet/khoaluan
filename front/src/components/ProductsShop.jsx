import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {products} from '../data.js'
import '../styles/productsshop.css'
import ProductShop from './ProductShop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate'


const ProductsShop = () => {


    //lọc loại sp và tất cả sp
    const [data, setData] = useState(products);

    //loai sp
    const [category, setCategory] = useState([]);

    //So trang
    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 3;
    const pagesVisited = pageNumber * productPerPage;
    const displayProducts = data.slice(pagesVisited, pagesVisited + productPerPage).map((item) => (
        <ProductShop item={item} key={item._id} />
    ))
    const pageCount = Math.ceil(data.length / productPerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }


    //loc tat ca sp
    const filterResult = (catItem) => {
        const result = products.filter((curDate) => {
            return curDate.category === catItem;
        });
        setData(result);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/category');
            setCategory(result.data);
        }
        fetchData();
    }, []);



    return (
        <div className='shop-container'>
            <div className='shop-row'>
                <div className='shop-col'>
                    <h2>Loại sản phẩm</h2>
                    {/* show tat ca sp neu tồn tại trong ds */}
                    <button className="shop-btn" onClick={() => setData(products)}>Tất cả <FontAwesomeIcon icon={faChevronRight} /></button>
                    {category.map((item) => (
                        <button className="shop-btn" onClick={() => filterResult(item.title)}>{item.title} <FontAwesomeIcon icon={faChevronRight} /></button>
                    ))}
                </div>
                {/* show các sp cần hiện tt */}
                <div className='shop-col'>
                    <div className='shop-products'>
                        {displayProducts}
                    </div>
                    <div className='shop-pagination'>
                        <ReactPaginate 
                            previousLabel={">>"}
                            nextLabel={">>"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsShop