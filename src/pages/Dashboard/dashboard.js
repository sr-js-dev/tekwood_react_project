import React, {Component} from 'react'
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Buycreditform from './buycredit_form'
import Getfileform from './getfile_form'
import Axios from 'axios';
import * as Auth   from '../../components/auth';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
});
class Dashboard extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            userCredits:''
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this.getCreditsByuserId()
    }
    getCreditsByuserId = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetUserDataById+Auth.getUserId(), headers)
        .then(result => {
            this.setState({userCredits:result.data.availableCredits})
        });
    }
    render(){   
        return (
            <div>
                <div className="content__header content__header--with-line">
                    <h2 className="title">Dashboard</h2>
                </div>
                <div className="dashboard__top dashboard_">
                    <div className="dashboard__top-long-wrap">
                        <div className="dashboard__top-long">
                            <div>
                                <h6 className="dashboard__top-long-title">Buy Credits</h6>
                                <p className="dashboard__top-long-description">Buy credits</p>
                            </div>
                            <div className="dashboard__top-long-img">
                                <img src={require("../../assets/images/icon-cart-white.svg")} alt="cart" onClick={()=>this.setState({modalShow:true})}/>
                            </div>
                        </div>
                        <div className="dashboard__top-long">
                            <div>
                                <h6 className="dashboard__top-long-title">Get Files</h6>
                                <p className="dashboard__top-long-description">Credit card, PayPal, Worldpay, On Account</p>
                            </div>
                            <div className="dashboard__top-long-img">
                                <img src={require("../../assets/images/icon-payment-white.svg")} alt="payment" onClick={()=>this.setState({modalShowFile:true})}/>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard__top-small-wrap">
                        <div className="dashboard__top-small">
                            <div className="dashboard__top-small-header">
                                <img src={require("../../assets/images/icon-exclamation.svg")} alt="exclamation"/>
                                <span>Available Credits</span>
                            </div>
                            <div className="dashboard__top-small-value">Credits: {this.state.userCredits} </div>
                        </div>
                        {/* <div className="dashboard__top-small">
                            <div className="dashboard__top-small-header">
                                <img src={require("../../assets/images/icon-time.svg")} alt="time"/>
                                <span>Due Soon</span>
                            </div>
                            <div className="dashboard__top-small-value">
                                € 369.22
                            </div>
                        </div>
                        <div className="dashboard__top-small">
                            <div className="dashboard__top-small-header">
                                <img src={require("../../assets/images/icon-flag.svg")} alt="flag"/>
                                <span>Total Outstanding</span>
                            </div>
                            <div className="dashboard__top-small-value">€ 1568.50</div>
                        </div> */}
                    </div>
                </div>
                <Buycreditform
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false})}
                />
                <Getfileform
                    show={this.state.modalShowFile}
                    onHide={() => this.setState({modalShowFile: false})}
                />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);