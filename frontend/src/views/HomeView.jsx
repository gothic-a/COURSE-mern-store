import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

import { listProducts } from '../actions/productActions'

const HomeView = () => {  

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest products</h1>
            { loading ? <Spinner />
                : error ? (<Message variant='danger'>{error}</Message>)
                :  ( <Row>
                        {
                            products.map(p => {
                                return (
                                    <Col key={p._id} sm={12} md={6} lg={3} >
                                        <Product {...p} />
                                    </Col>
                                )
                            })
                        }
                    </Row> )
            }
        </>
    )
}

export default HomeView