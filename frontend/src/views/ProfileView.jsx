import { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import useQuery from '../utils/useQuery'
import { Form , Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from  'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileView = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const history = useHistory()
    const redirect = useQuery().get('redirect')

    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.userDetails)
    const { userInfo } = useSelector(state => state.userLogin)
    const { success } = useSelector(state => state.userUpdateProfile)

    useEffect(() => {
        if(!userInfo) {
            history.push('/')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, user, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage('Password don`t match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password}))
        }
    }

    return (
        <Row >
            <Col md={3}>
                <h2>User profile</h2>
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
                    { success && <Message variant="success">Profile updated</Message> }
                    <Row>
                        <Col md={6}>
                            <Button type="submit" variant="primary" disabled={loading ? true : false}>
                                Update
                            </Button>
                        </Col>
                    
                    </Row>
                </Form>
            </Col>

            <Col md={9}>
            
            </Col>
        </Row>
    )
}

export default ProfileView