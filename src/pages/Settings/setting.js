import React, {Component} from 'react'
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BallBeat } from 'react-pure-loaders';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// import Settingform from './setting_form'
import { trls } from '../../components/translate';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    
});
class Settings extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {  
            settingData:[],
            flag:'',
            editflag:false,
            loading:true,
        };
      }
    componentDidMount() {
        this.getSettingData()
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    getSettingData = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetSettingData, headers)
        .then(result => {
            this.setState({settingData:result.data})
            this.setState({percredit:result.data.pricePerCredit})
            this.setState({pertimber:result.data.creditPerTimber})
            this.setState({perplate:result.data.creditPerPlate})
            this.setState({loading:false})
        });
    }
    editSetting = () => {
        this.setState({editflag:true})
    }
    saveSetting = () => {
        var params = {
            "pricePerCredit":this.state.percredit,
            "creditPerTimber":this.state.pertimber,
            "creditPerPlate":this.state.perplate
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.post(API.PostSetting, params, headers)
        .then(result => {
            this.setState({editflag:false})
            this.setState({loading:true});
            this.getSettingData()
        })
        .catch(err => {
        });
        
    }
    changePerCredit = (e) => {
        this.setState({percredit:e.target.value})
    }
    changetPerTimber = (e) => {
        this.setState({pertimber:e.target.value})
    }
    changePerPlate = (e) => {
        this.setState({perplate:e.target.value})
    }
    render () {
        let settingData=this.state.settingData;
        return (
            <div className="order_div">
                <div className="content__header content__header--with-line">
                    <h2 className="title">{trls('Settings')}</h2>
                </div>
                <div className="orders">
                    <div className="orders__filters justify-content-between">
                    </div>
                    <div className="table-responsive">
                        
                        <table className="place-and-orders__table table table--striped prurprice-dataTable"  >
                            <thead>
                            <tr>
                                <th>{trls('PricePerCredit')}</th>
                                <th>{trls('CreditPerTimber')}</th>
                                <th>{trls('CreditPerPlate')}</th>
                            </tr>
                            </thead>
                            {settingData && !this.state.loading &&(<tbody >
                                { !this.state.editflag && (
                                    <tr>
                                        <td>{settingData.pricePerCredit}</td>
                                        <td>{settingData.creditPerTimber}</td>
                                        <td>{settingData.creditPerPlate}</td>
                                    </tr>
                                )}
                                { this.state.editflag && (
                                    <tr>
                                        <td><Form.Control type="text" name="credit" required placeholder="PricePerCredit" defaultValue={settingData.pricePerCredit} onChange={this.changePerCredit}/></td>
                                        <td><Form.Control type="text" name="timber" required placeholder="CreditPerTimber" defaultValue={settingData.creditPerTimber} onChange={this.changetPerTimber}/></td>
                                        <td><Form.Control type="text" name="plate" required placeholder="CreditPerPlate" defaultValue={settingData.creditPerPlate} onChange={this.changePerPlate}/></td>
                                    </tr>
                                )}
                            </tbody>)}
                        </table>
                        { this.state.loading&& (
                            <div className="col-md-4 offset-md-4 col-xs-12 loading" style={{textAlign:"center"}}>
                                <BallBeat
                                    color={'#222A42'}
                                    loading={this.state.loading}
                                />
                            </div>
                        )}
                        { !this.state.editflag&&!this.state.loading && (
                            <button className="btn-small place-and-orders__add-row-btn add-row" onClick = {this.editSetting} style={{float:"right"}}>Edit</button>
                        )}
                        { this.state.editflag&&!this.state.loading && (
                            <button className="btn-small place-and-orders__add-row-btn add-row" onClick = {this.saveSetting} style={{float:"right"}}>Save</button>
                        )}
                    </div>
                </div>
            </div>
        )
        };
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);
