import React, {  useState, useEffect } from 'react'

import axios from 'axios'

import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product'

const HomeView = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }

        fetchProducts()
    }, [])

    return (
        <>
            <h1>Latest products</h1>
            <Row>
                {
                    products.map(p => {
                        return (
                            <Col key={p._id} sm={12} md={6} lg={3} >
                                <Product {...p} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default HomeView