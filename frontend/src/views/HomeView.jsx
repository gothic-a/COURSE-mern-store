import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import useQuery from '../utils/useQuery'

import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

import { listProducts } from '../actions/productActions'

const HomeView = () => {  
    const history = useHistory()
    const { keyword } = useParams()
    const pageNumber = useQuery().get('page')

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, products, error, page, pageCount, pageSize, productsOnScreen, totalProductsCount } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    const loadClickHandler = (value) => {
        history.push(`/?page=${page + 1}`)
    }

    const prevClickHandler = () => {
        dispatch(listProducts(keyword, page - 1))
    }

    return (
        <>
            <h1 className="pb-3" >Latest products</h1>
            
            {
                
                pageNumber && productsOnScreen / pageNumber !== pageSize 
                    && (
                        <Row 
                            className="py-3" 
                            style={{display: 'flex', justifyContent: 'center'}}
                        >
                            <Button 
                                style={{width: 'auto'}}
                                onClick={prevClickHandler}
                            >
                                load previous
                            </Button>
                        </Row>
                    ) 
            }
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
            {
                <Row 
                    className="py-3" 
                    style={{display: 'flex', justifyContent: 'center'}}
                >
                    <span className="py-2" style={{textAlign: 'center'}}>{productsOnScreen}/{totalProductsCount}</span>
                    <Button 
                        style={{width: 'auto'}}
                        onClick={() => loadClickHandler(1)}
                        disabled={+pageNumber === pageCount}
                    >
                        load more
                    </Button>
                </Row>
            }
        </>
    )
}

export default HomeView