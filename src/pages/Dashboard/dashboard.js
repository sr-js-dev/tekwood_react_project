import React, {Component} from 'react'
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Buycreditform from './buycredit_form'
import Getfileform from './getfile_form'
import Axios from 'axios';
import * as Auth   from '../../components/auth';
import { trls } from '../../components/translate';
import queryString from 'query-string'
import { BallBeat } from 'react-pure-loaders';
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
            userCredits:'',
            credithistory: [],
            loading:true,
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        let search = window.location.search;
        let query = queryString.parse(search);
        this.setState({paymentmessage:query.status })
        this.getCreditsByuserId()
        this.getCreditsHistory()
    }
    getCreditsByuserId = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetUserDataById+Auth.getUserId(), headers)
        .then(result => {
            this.setState({userCredits:result.data.availableCredits})
        });
        this.getCreditsHistory();
    }
    getCreditsHistory = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetCreditsHistory, headers)
        .then(result => {
            this.setState({credithistory:result.data.data})
            this.setState({loading:false})
        });
    }
    formatDate = (startdate) =>{
        var dd = new Date(startdate).getDate();
        var mm = new Date(startdate).getMonth()+1; 
        var yyyy = new Date(startdate).getFullYear();
        var formatDate = '';
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        formatDate = dd+'-'+mm+'-'+yyyy;
        return formatDate;
    }
    downHundeggerFile = (e) => {
        window.location = API.DownLoadFile+e.target.id
    }
    render(){   
        return (
            <div>
                <div className="dashboard-header content__header content__header--with-line">
                    <h2 className="title">{trls('Dashboard')}</h2>
                    { this.state.paymentmessage === "Success" ? (
                        <div className="alert alert-success">
                            <strong>{trls('Success')}</strong> {trls('Success_m')}
                        </div>
                    ) : <div/>
                    }
                    { this.state.paymentmessage === "Expired" ? (
                        <div className="alert alert-success">
                            <strong>{trls('Expired')}</strong> {trls('Expired_m')}
                        </div>
                    ) : <div/>
                    }
                    { this.state.paymentmessage === "Cancelled" ? (
                        <div className="alert alert-success">
                            <strong>{trls('Cancelled')}</strong> {trls('Cancelled_m')}
                        </div>
                    ) : <div/>
                    }
                    { this.state.paymentmessage === "Failure" ? (
                        <div className="alert alert-success">
                            <strong>{trls('Failure')}</strong> {trls('Failure_m')}
                        </div>
                    ) : <div/>
                    }
                </div>
                <div className="dashboard__top dashboard_">
                    <div className="dashboard__top-long-wrap">
                        <div className="dashboard__top-long">
                            <div>
                                <h6 className="dashboard__top-long-title">{trls('Buy_Credits')}</h6>
                            </div>
                            <div className="dashboard__top-long-img">
                                <img src={require("../../assets/images/icon-payment-white.svg")} style={{cursor: "pointer"}} alt="payment" onClick={()=>this.setState({modalShow:true})}/>
                            </div>
                        </div>
                        <div className="dashboard__top-long">
                            <div>
                                <h6 className="dashboard__top-long-title">{trls('Get_File')}</h6>
                            </div>
                            <div className="dashboard__top-long-img">
                                <img src={require("../../assets/images/icon-cart-white.svg")} style={{cursor: "pointer"}} alt="cart" onClick={()=>this.setState({modalShowFile:true})}/>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard__top-small-wrap">
                        <div className="dashboard__top-small">
                            <div className="dashboard__top-small-header">
                                <img src={require("../../assets/images/icon-exclamation.svg")} alt="exclamation"/>
                                <span>{trls('Available_Credits')}</span>
                            </div>
                            <div className="dashboard__top-small-value">{trls('Credits')}: {this.state.userCredits} </div>
                        </div>
                    </div>
                </div>
                <h6 style={{fontWeight:"bold"}}>{trls('Credit_History')}</h6>
                <div className="table-responsive credit-history">
                    <table className="place-and-orders__table table table--striped prurprice-dataTable">
                        <thead>
                        <tr>
                            <th>{trls('CreateDate')}</th>
                            <th>{trls('Creditsreductedoradded')}</th>
                            <th>{trls('Download_Link')}</th>
                        </tr>
                        </thead>
                            {this.state.credithistory &&(<tbody >
                                {
                                    this.state.credithistory.map((data,i) =>(
                                    <tr id={i} key={i}>
                                        <td>{this.formatDate(data.createdDate)}</td>
                                        <td>{data.creditReductedOrAdded}</td>
                                        <td>
                                            {data.creditReductedOrAdded<0 && (
                                                <p id={data.hundeggerFileReferenceId} style={{cursor: "pointer", color:'#004388', fontSize:"13px", fontWeight:'bold', textDecoration:"underline"}} onClick={this.downHundeggerFile}>File Download</p>
                                            )}
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>)}
                    </table>
                    <div className="col-md-4 offset-md-4 col-xs-12 loading" style={{textAlign:"center"}}>
                        <BallBeat
                            color={'#222A42'}
                            loading={this.state.loading}
                        />
                    </div>
                </div>   
                <Buycreditform
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false})}
                />
                <Getfileform
                    show={this.state.modalShowFile}
                    onHide={() => this.setState({modalShowFile: false})}
                    onGetCradit={this.getCreditsByuserId}
                    onGetCraditHistory={this.getCreditsByuserId}
                />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);