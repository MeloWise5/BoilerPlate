import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { updateUserProfileDetails, getUserDetails } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [messageError, setMessageError] = useState('')
    const [messageSuccess, setMessageSuccess] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, user, navigate, success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessageError('Passwords do not match')
        } else {
            dispatch(updateUserProfileDetails({ id: user._id, name, email, password }))
            setMessageSuccess('Profile updated successfully')
            setMessageError('')
        }
    }

    return (
        <Row>
            <Col md={6}>
                <h2>User Profile</h2>
                {loading && <Loader />}
                {messageSuccess && <Message variant='success'>{messageSuccess}</Message>}
                {messageError && <Message variant='danger'>{messageError}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId='email' className='mb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId='password' className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter new password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirm' className='mb-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update Profile</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default ProfileScreen
