import React, {Component} from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BallBeat } from 'react-pure-loaders';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
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
            vatPercentage: ''
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
            this.setState({vatPercentage: result.data.vatPercentage})
            this.setState({loading:false})
        });
    }
    editSetting = () => {
        this.setState({editflag:true})
    }
    saveSetting = () => {
        var params = {
            "pricePerCredit": this.state.percredit,
            "creditPerTimber": this.state.pertimber,
            "creditPerPlate": this.state.perplate,
            "vatPercentage": this.state.vatPercentage
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.post(API.PostSetting, params, headers)
        .then(result => {
            this.setState({editflag:false});
            this.setState({loading:true});
            this.getSettingData();
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

    changeVatPercentage = (e) => {
        this.setState({vatPercentage:e.target.value})
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
                                <th>{trls('VatPercentage')}</th>
                            </tr>
                            </thead>
                            {settingData && !this.state.loading &&(<tbody >
                                { !this.state.editflag && (
                                    <tr>
                                        <td>{settingData.pricePerCredit}</td>
                                        <td>{settingData.creditPerTimber}</td>
                                        <td>{settingData.creditPerPlate}</td>
                                        <td>{settingData.vatPercentage}%</td>
                                    </tr>
                                )}
                                { this.state.editflag && (
                                    <tr>
                                        <td><Form.Control type="number" name="credit" required placeholder="PricePerCredit" defaultValue={settingData.pricePerCredit} onChange={this.changePerCredit}/></td>
                                        <td><Form.Control type="number" name="timber" required placeholder="CreditPerTimber" defaultValue={settingData.creditPerTimber} onChange={this.changetPerTimber}/></td>
                                        <td><Form.Control type="number" name="plate" required placeholder="CreditPerPlate" defaultValue={settingData.creditPerPlate} onChange={this.changePerPlate}/></td>
                                        <td><Form.Control type="number" name="vat" required placeholder="vatPercentage" defaultValue={settingData.vatPercentage} onChange={this.changeVatPercentage}/></td>
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
                            <Button type="button" style={{float:"right"}} onClick = {this.editSetting}><i className="fas fa-edit" style={{paddingRight:5}}/>{trls('Edit')}</Button>
                        )}
                        { this.state.editflag&&!this.state.loading && (
                            <Button type="button" style={{float:"right"}} onClick = {this.saveSetting}><i className="fas fa-edit" style={{paddingRight:5}}/>{trls('Save')}</Button>
                        )}
                    </div>
                </div>
            </div>
        )
        };
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);
