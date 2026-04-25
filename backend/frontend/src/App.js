import {useEffect} from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

function App() {

  return (
    <Router >
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
            <Route path="/admin/userList" element={<UserListScreen/>} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
