import React, { useState, useEffect } from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import { useNavigate, Navigate, Routes, Router, BrowserRouter, Route, Link } from 'react-router-dom';
import Watch from './Pages/Watch/Watch';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home.js';
import MyList from './Pages/MyList/MyList.js';
import WatchList from './Pages/WatchList/WatchList';
import UserProfile from './Pages/UserProfile';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// React Router v6.0
const App = () => {
  const [user, setUser] = useState(null)
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const baseURL = "/api/urls"
  const [urls, setUrls] = useState([])



  const clearInput = (event) => {
    event.preventDefault()
    setQuery('')
    setData([])

  }
  const handleInput = (event) => {
    event.preventDefault()
    setQuery(event.target.value)
  }
  useEffect(() => {
    if (query.length > 2) {
      search()
    }
    if (query == "") {
      setData([])
    }
  }, [query])

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = () => {
    axios.get(baseURL)
      .then((response) => {
        setUrls(response.data)
      })
  }

  const search = async () => {
   
    const res = await axios.get(`/search/?q=${query}`)
    setData(res.data)
  }
  /**
      * 
      * @param {*} event 
      * 
      * This method is added for logout, token is removed and navigated back to to login page 
      * using useNavigate hook 
      * 
      */


  const useLogoutHandler = (event) => {
    event.preventDefault();
    console.log("clear token")
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    console.log("clear token")
    window.location.href = "/";
  }


  // if user has logged in
  if (user) {
    return (
      <><div id="site-container">
        <BrowserRouter>
          <Navbar sticky="top" variant="light" className='customBg'>
            <Container>
              <Navbar.Brand className='custom-link'> <Link className='app-name link' to="/homepage">Classix+</Link> </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link className='custom-link'><Link to="/homepage" className="link">Home</Link></Nav.Link>
                <Nav.Link><Link to="/browse/myfavouritelist" className="link">Favourite List</Link></Nav.Link>
                <Nav.Link><Link to="/browse/mywatchlist" className="link">Watch List</Link></Nav.Link>
                <Nav.Link><Link to="/userprofile" className="link">Profile</Link></Nav.Link>
                <Nav.Link>
                  <Link to="/login" onClick={useLogoutHandler} className="link">Logout</Link>
                </Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={e => { e.preventDefault(); }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={query}
                  onChange={handleInput} />
                {query.length > 0 ? <Button onClick={clearInput}>X</Button> : <></>}
                {/* */}
              </Form>
            </Container>
          </Navbar>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login user={user} setUser={setUser} />} />
            <Route path='/homepage' element={user ? <Home user={user} data={data} urls={urls} /> : <Navigate replace to="/login" />} />
            <Route path='/browse/myfavouritelist' element={user ? <MyList user={user} data={data} urls={urls} /> : <Navigate replace to="/login" />} />
            <Route path='/browse/mywatchlist' element={user ? <WatchList user={user} data={data} urls={urls} /> : <Navigate replace to="/login" />} />
            <Route path='/userProfile' element={<UserProfile />} />
            <Route path='/watch' element={<Watch />} user={user} />
          </Routes>
        </BrowserRouter>
      </div> <div>

        </div></>

    )
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login user={user} setUser={setUser} />} />
          <Route path='/userProfile' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    );

  }

}

export default App;


