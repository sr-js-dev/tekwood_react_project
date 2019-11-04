import { Link } from 'react-router-dom';
import React from 'react';
import * as salesAction  from '../../actions/authAction';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ListErrors from '../../components/listerrors';
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    authLogin: (params) =>
              dispatch(salesAction.fetchLoginData(params)),
});

class Login extends React.Component {
//   constructor() {   
//     super();
//     };
  handleSubmit = (event) => {
    event.preventDefault();
    const clientFormData = new FormData(event.target);
    const data = {};
    for (let key of clientFormData.keys()) {
        data[key] = clientFormData.get(key);
    }
    this.props.authLogin(data);
  }
  render() {
    return (
      <div className="auth-page" style={{height:"100%"}}>
        <div className="container login-page">
          <div className="row">
            <div className="col-md-9 offset-md-2 col-xs-12 login-page-div">
                <Row style={{height:"100%",width:"100%"}}>
                  <div className="login-side-div">
                    <img src={require('../../assets/images/img_admin_side.png')} alt="appzmakerz" className="login-side-grad"></img>
                  </div>
                  <Col  className="login-form-div">
                    <img src='https://www.tekwoods.nl/wordpress/wp-content/uploads/Logo_TW_RGB-1-300x100.png' alt="appzmakerz" style={{marginTop:"40px"}}></img>
                    
                     <form className="login-form" onSubmit = { this.handleSubmit }>
                     <ListErrors errors={this.props.error} />
                        <fieldset>  
                            <fieldset className="form-group">
                                <input type="text" name="username" className="orders__filters-search input-email" placeholder="Username"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <input type="password" name="password" className="orders__filters-search input-password" placeholder="Password"/>
                            </fieldset>
                            <p className="text-xs-center">
                                <Link to="/register" style={{color:"rgb(84, 79, 79)"}}>
                                    Forgot password?
                                </Link>
                            </p>
                            <button type="submit" className="btn-small place-and-orders__add-row-btn add-row sign-in">Sign in</button>
                        </fieldset>
                    </form>
                  </Col>
                </Row>
                
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);