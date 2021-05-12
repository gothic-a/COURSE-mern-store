import React from 'react'

import Product from '../components/Product'

import { Row, Col } from 'react-bootstrap'
import products from '../products'

const HomeView = () => {
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