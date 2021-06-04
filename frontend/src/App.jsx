import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
import ProfileView from './views/ProfileView'
import ShippingView from './views/ShippingView'
import PaymentView from './views/PaymentView'
import PlaceOrderView from './views/PlaceOrderView'

import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
        <Header />

        <div className="content py-3">
          <Container>
            <Route path='/' exact component={HomeView}/>
            <Route path='/products/:id' exact component={ProductView}/>
            <Route path='/cart/:id?' exact component={CartView}/>
            <Route path='/login' component={LoginView}/>
            <Route path='/register' component={RegisterView}/>
            <Route path='/profile' component={ProfileView}/>
            <Route path='/shipping' component={ShippingView}/>
            <Route path='/payment' component={PaymentView}/>
            <Route path='/placeorder' component={PlaceOrderView}/>
          </Container>
        </div>

        <Footer />
    </Router>
  );
}

export default App;
