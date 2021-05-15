import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import HomeView from './views/HomeView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
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
          </Container>
        </div>

        <Footer />
    </Router>
  );
}

export default App;
