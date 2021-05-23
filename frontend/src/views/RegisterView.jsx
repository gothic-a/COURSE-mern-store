import { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import useQuery from '../utils/useQuery'
import { Form , Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from  'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { register } from '../actions/userActions'

const RegisterView = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const history = useHistory()
    const redirect = useQuery().get('redirect')

    const dispatch = useDispatch()
    const { loading, error, userInfo } = useSelector(state => state.userRegister)

    useEffect(() => {
        if(userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage('Password don`t match')
        } else {
            setMessage(null)
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h2>Sign Up</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="py-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="email" className="pb-3">
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

                <Form.Group controlId="confirmPassword" className="pb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                { error && <Message variant="danger">{error}</Message> }
                { message && <Message variant="danger">{message}</Message> }

                <Row>
                    <Col md={6}>
                        <Button type="submit" variant="primary" disabled={loading ? true : false}>
                            Sign Up
                        </Button>
                    </Col>
                   
                </Row>
            </Form>

            <Row className='py-3'>
                <Col>
                    <span>Have an Account? </span> 
                    <Link to={ redirect ? `/login?redirect=${redirect}` : '/login' }>
                        login
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

export default RegisterView