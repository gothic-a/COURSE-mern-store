import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'

const Product = ({_id, name, image, raiting, numReviews, price}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/products/${_id}`}>
                <Card.Img src={image} variant="top" />
            </Link>

            <Card.Body>

                <Link to={`/products/${_id}`}>
                    <Card.Title as="div">{ name }</Card.Title>      
                </Link>

                <Card.Text as="div">
                    <Rating value={raiting} text={`${numReviews} reviews`} />
                </Card.Text>

                <Card.Text as="h3" className="my-3">${price}</Card.Text>   
            </Card.Body>
        </Card>
    )
}

export default Product