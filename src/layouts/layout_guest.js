import React, {Component} from 'react'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import { Switch, Router, Route } from 'react-router-dom';
import User from '../pages/User/user_register'
import Settings from '../pages/Settings/setting'
import Dashboard from '../pages/Dashboard/dashboard'
import Customer from '../pages/Customer/customer_manage'
import history from '../history';

class Layout extends Component {
  
    render () {
      return (
          <Row style={{height:"100%"}}>
            <Sidebar/>
            <Col  style={{paddingLeft:0, paddingRight:0}}>
            <Header/>
                <Router history={history}>
                  <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/user" component={User} />
                    <Route path="/setting" component={Settings} />
                    <Route path="/customer" component={Customer} />
                  </Switch>
                </Router>
            </Col>
          </Row>
      )
    };
  }
  export default Layout;
