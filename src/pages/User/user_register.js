import React, {Component} from 'react'
import { Form,Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Adduserform from './adduserform';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from 'jquery';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
import { BallBeat } from 'react-pure-loaders';
import { getUserToken } from '../../components/auth';
import * as authAction  from '../../actions/authAction';
import { trls } from '../../components/translate';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    authLoginAs: (params) =>
              dispatch(authAction.fetchLoginAsData(params)),
});
class Userregister extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {  
            userData:[],
            flag:'',
            userUpdateData:[],
            loading:true,
            customerData: []
        };
      }
    componentDidMount() {
        this._isMounted=true
        this.getUserData();
        this.getCustomerData();
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getUserData () {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetUserData, headers)
        .then(result => {
            Axios.get(API.GetUserData+"?excludeInactiveUser=true&pageNumber=1&pageSize="+result.data.totalCount, headers)
            .then(result => {
                if(this._isMounted){
                    this.setState({userData:result.data.data})
                    this.setState({loading:false})
                }
            });
        });
    }

    getCustomerData = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetCustomerData+"?excludeInactiveCustomer=true&pageNumber=1&pageSize=10", headers)
        .then(result => {
            Axios.get(API.GetCustomerData+"?excludeInactiveCustomer=true&pageNumber=1&pageSize="+result.data.totalCount, headers)
            .then(result => {
                if(this._isMounted){
                    this.setState({customerData:result.data.data})
                }
            });
        });
    }

    userUpdate = (event) => {
        let userID=event.currentTarget.id;
        var settings = {
            "url": API.GetUserDataById+event.currentTarget.id,
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            this.setState({userUpdateData: response})
            this.setState({modalShow:true, mode:"update",userID:userID, flag:true})
        });
    }

    viewUserData = (event) => {
        var settings = {
            "url": API.GetUserDataById+event.currentTarget.id,
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            this.setState({userUpdateData: response})
            this.setState({modalShow:true, mode:"view", flag:true})
        });
    }

    userDelete = (event) => {
        var settings = {
            "url": API.DeactivateUser+this.state.userId,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            this.getUserData();
        });
    }

    loginAsUser = (value) =>{
        this.setState({username:value})
        confirmAlert({
            title: trls("Confirm"),
            message: trls("Are_you_sure"),
            buttons: [
              {
                label: trls("OK"),
                onClick: () => {
                    this.props.authLoginAs(this.state.username)
                }
              },
              {
                label: trls("Cancel"),
                onClick: () => {}
              }
            ]
          });
        
    }

    userDeleteConfirm = (event) => {
        this.setState({userId:event.currentTarget.id})
        confirmAlert({
            title: trls("Confirm"),
            message: trls("Are_you_sure"),
            buttons: [
              {
                label: trls("Delete"),
                onClick: () => {
                   this.userDelete()
                }
              },
              {
                label: trls("Cancel"),
                onClick: () => {}
              }
            ]
          });
    }

    render () {
        let userData=this.state.userData;
        console.log('2222', userData)
        return (
            <div className="order_div">
                <div className="content__header content__header--with-line">
                    <h2 className="title">{trls('Users')}</h2>
                </div>
                <div className="orders">
                    <div className="orders__filters justify-content-between">
                        <Form inline style={{width:"100%"}}>
                            <Button variant="primary" onClick={()=>this.setState({modalShow:true, mode:"add", flag:false})}><i className="fas fa-plus" style={{paddingRight:5}}/>{trls('Add_User')}</Button> 
                            <Adduserform
                                show={this.state.modalShow}
                                mode={this.state.mode}
                                onHide={() => this.setState({modalShow: false})}
                                onGetUser={() => this.getUserData()}
                                userUpdateData={this.state.userUpdateData}
                                userID={this.state.userID}
                                customerData={this.state.customerData}
                            />  
                        </Form>
                    </div>
                    <div className="table-responsive credit-history">
                        <table className="place-and-orders__table table table--striped prurprice-dataTable"  >
                            <thead>
                                <tr>
                                    <th>{trls('FirstName')}</th>
                                    <th>{trls('LastName')}</th>
                                    <th>{trls('Email')}</th>
                                    <th>{trls('Company')}</th>
                                    <th>{trls('Active')}</th>
                                    <th style={{width:"20%"}}>{trls('Action')}</th>
                                </tr>
                            </thead>
                            {userData &&(<tbody >
                                {
                                    userData.map((data,i) =>(
                                    <tr id={i} key={i}>
                                        <td>{data.firstName}</td>
                                        <td>{data.lastName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.customer.name}</td>
                                        {data.isActive?(
                                            <td style={{display:"flex"}}>
                                                <i className="fas fa-circle active-icon"></i><div>Active</div>
                                            </td>
                                            ):
                                            <td style={{display:"flex"}}>
                                                <i className="fas fa-circle inactive-icon"></i><div>Inactive</div>
                                            </td>
                                        }
                                        <td >
                                            <Row style={{justifyContent:"center"}}>
                                                <i id={data.id} className="fas fa-trash-alt statu-item" onClick={this.userDeleteConfirm}></i>
                                                <i id={data.id} className="fas fa-edit statu-item" onClick={this.userUpdate}></i>
                                                <i id={data.id} className="fas fa-eye statu-item" onClick={this.viewUserData}></i>
                                                <i id={data.id} className="fas fa-exchange-alt statu-item" onClick={()=>this.loginAsUser(data.userName)}></i>
                                            </Row>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>)}
                        </table>
                        {this.state.loading&&(
                            <div className="col-md-4 offset-md-4 col-xs-12 loading" style={{textAlign:"center"}}>
                                <BallBeat
                                    color={'#222A42'}
                                    loading={this.state.loading}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
        };
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Userregister);
