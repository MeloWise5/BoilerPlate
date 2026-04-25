import React from 'react'
import { useSelector } from 'react-redux'
import Message from '../components/Message'

function HomeScreen() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div>
      {userInfo ? (
        <h2>Welcome, {userInfo.name}</h2>
      ) : (
        <Message variant='info'>Please log in to continue.</Message>
      )}
    </div>
  )
}

export default HomeScreen
