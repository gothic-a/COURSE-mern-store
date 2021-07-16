import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import useQuery from '../utils/useQuery'

import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

import { listProducts } from '../actions/productActions'
import { PRODUCT_LIST_RESET } from '../constants/productConstants'

const HomeView = () => {  
    const history = useHistory()

    const { keyword } = useParams()
    const pageFromQuery = useQuery().get('page')

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { 
        loading, 
        products, 
        error, 
        pageCount, 
        productsOnScreen, 
        totalProductsCount,
        lastPage,
        firstPage
    } = productList

    useEffect(() => {
        if(keyword) {
            dispatch(listProducts(keyword))
        } else if(pageFromQuery && (pageFromQuery < firstPage || pageFromQuery > lastPage)) {
            dispatch(listProducts(keyword, pageFromQuery))
        } else if(!firstPage && !lastPage) {
            dispatch(listProducts(keyword, pageFromQuery))
        } else {
            dispatch({type: PRODUCT_LIST_RESET})
            dispatch(listProducts())
        }
    }, [dispatch, keyword, pageFromQuery])

    const loadClickHandler = () => {
        history.push(`/?page=${lastPage + 1}`)
    }

    const prevClickHandler = () => {
        history.push(`/?page=${firstPage - 1}`)
    }

    return (
        <>
            <h1 className="pb-3" >Latest products</h1>
            {
                
                firstPage !== 1 &&  
                    (
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
                    <span className="py-2" style={{textAlign: 'center'}}>{productsOnScreen} watched from {totalProductsCount}</span>
                    <Button 
                        style={{width: 'auto'}}
                        onClick={loadClickHandler}
                        disabled={lastPage === pageCount}
                    >
                        load more
                    </Button>
                </Row>
            }
        </>
    )
}

export default HomeView