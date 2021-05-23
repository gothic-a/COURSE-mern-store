import { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import useQuery from '../utils/useQuery'
import { Form , Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from  'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { login } from '../actions/userActions'

const LoginView = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const redirect = useQuery().get('redirect')

    console.log(redirect)

    const dispatch = useDispatch()
    const { loading, error, userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        if(email && password) {
           dispatch(login(email, password)) 
        }
        

    }

    return (
        <FormContainer>
            <h2>Sign In</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="py-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="pb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                {
                    error && <Message variant="danger">{error}</Message>
                    // (
                    //     <Row>
                    //         <p style={{color: 'tomato', margin: 0}} className="py-3">{error}</p>
                    //     </Row>
                    // )
                }

                <Row>
                    <Col md={6}>
                        <Button type="submit" variant="primary" disabled={loading ? true : false}>
                            Sign In
                        </Button>
                    </Col>
                   
                </Row>
            </Form>

            <Row className='py-3'>
                <Col>
                    <span>New customer? </span> 
                    <Link to={ redirect ? `/register?redirect=${redirect}` : '/register' }>
                        Register
                    </Link>
                </Col>
            </Row>

            <Row className='py-3'>
                {
                    loading && <Spinner />
                }
            </Row>
        </FormContainer>
    )
}

export default LoginView