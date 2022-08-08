import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: "Viet",
            email: "dangvanvietk11@siu.edu.vn",
            password: bcrypt.hashSync('admin'),
            isAdmin: true
        },
        {
            name: "Dang",
            email: "dangvanviet2000@gmail.com",
            password: bcrypt.hashSync('dang'),
            isAdmin: false
        },
    ],

    sliderItems : [
        {
            //_id: 1,
            image: "/images/slider/1.1.jpg"
        },
        {
            //_id: 2,
            image: "/images/slider/2.jpg"
        },
        {
            //_id: 3,
            image: "/images/slider/3.jpg"
        },
    ],

    category : [
        {
            //_id: 1,
            title: "Nam",
            image: "/images/category/men1.jpg"
        },
        {
            //_id: 2,
            title: "Suit",
            image: "/images/category/suit1.jpg"
        },
        {
            //_id: 3,
            title: "Nữ",
            image: "/images/category/women1.jpg"
        },
    ],

    products : [
        {
            //_id: 1,
            title: "Sản phẩm 1",
            slug: 'sanpham1',
            desc: "Mô tả sản phẩm 1",
            category: "Nam",
            image: "/images/products/1.jpg",
            image1: "/images/products/2.jpg",
            image2: "/images/products/3.jpg",
            image3: "/images/products/4.jpg",
            countInStock: 2,
            price: "80.00",
        },
        {
            //_id: 2,
            title: "Sản phẩm 2",
            slug: 'sanpham2',
            desc: "Mô tả sản phẩm 2",
            category: "Suit",
            image: "/images/products/5.jpeg",
            image1: "/images/products/6.jpeg",
            image2: "/images/products/7.jpeg",
            image3: "/images/products/8.jpeg",
            countInStock: 5,
            price: "65.00",
        },
        {
            //_id: 3,
            title: "Sản phẩm 3",
            slug: 'sanpham3',
            desc: "Mô tả sản phẩm 3",
            category: "Nữ",
            image: "/images/products/9.jpg",
            image1: "/images/products/10.jpg",
            image2: "/images/products/11.jpg",
            image3: "/images/products/12.jpg",
            countInStock: 10,
            price: "74.00",
        },
        {
            //_id: 4,
            title: "Sản phẩm 4",
            slug: 'sanpham4',
            desc: "Mô tả sản phẩm 4",
            category: "Vest",
            image: "/images/products/13.jpg",
            image1: "/images/products/14.jpg",
            image2: "/images/products/15.jpg",
            image3: "/images/products/16.jpg",
            countInStock: 4,
            price: "92.00",
        },
        {
            //_id: 5,
            title: "Sản phẩm 5",
            slug: 'sanpham5',
            desc: "Mô tả sản phẩm 5",
            category: "Vest",
            image: "/images/products/17.jpg",
            image1: "/images/products/18.png",
            image2: "/images/products/19.png",
            image3: "/images/products/20.jpg",
            countInStock: 4,
            price: "92.00",
        },
        {
            //_id: 6,
            title: "Sản phẩm 6",
            slug: 'sanpham6',
            desc: "Mô tả sản phẩm 6",
            category: "Vest",
            image: "/images/products/13.jpg",
            countInStock: 4,
            price: "92.00",
        },
        {
            //_id: 7,
            title: "Sản phẩm 7",
            slug: 'sanpham7',
            desc: "Mô tả sản phẩm 7",
            category: "Vest",
            image: "/images/products/13.jpg",
            countInStock: 4,
            price: "92.00",
        },
        {
            //_id: 8,
            title: "Sản phẩm 8",
            slug: 'sanpham8',
            desc: "Mô tả sản phẩm 8",
            category: "Vest",
            image: "/images/products/13.jpg",
            countInStock: 4,
            price: "92.00",
        },
    ]
}

export default data;
