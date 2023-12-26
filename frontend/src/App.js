import './App.css';
import { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from '../src/actions'
import Header from './components/Header.js';
import LandingPage from './components/LandingPage.js';
import Payment from './components/Payment.js';
const Home = () => <h2>Home</h2>
const Dashboard = () => <h2>Dashboard</h2>

class App extends Component {
  componentDidMount(){
    this.props.fetchUser()
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <div className="container">
            <Route exact path='/' component={LandingPage} />
            <Route exact={true} path='/dashboard' component={Dashboard} />
            {/* exact and exact ={true} are same */}
            <Route exact={true} path='/payment' component={Payment} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
