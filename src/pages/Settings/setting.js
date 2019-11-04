import React, {Component} from 'react'
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Settingform from './setting_form'
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
        });
    }
    render () {
        let settingData=this.state.settingData;
        return (
            <div className="order_div">
                <div className="content__header content__header--with-line">
                    <h2 className="title">Settings</h2>
                </div>
                <div className="orders">
                    <div className="orders__filters justify-content-between">
                        <Form inline style={{width:"100%"}}>
                            <Button variant="primary" onClick={()=>this.setState({modalShow:true, mode:"add", flag:false})}>Add Settings</Button> 
                            <Settingform
                                show={this.state.modalShow}
                                onGetSetting={() => this.getSettingData()}
                                onHide={() => this.setState({modalShow: false})}
                            />
                        </Form>
                    </div>
                    <div className="table-responsive">
                        <table className="place-and-orders__table table table--striped prurprice-dataTable"  >
                            <thead>
                            <tr>
                                <th>PricePerCredit</th>
                                <th>CreditPerTimber</th>
                                <th>CreditPerPlate</th>
                            </tr>
                            </thead>
                            {settingData &&(<tbody >
                                <tr>
                                    <td>{settingData.pricePerCredit}</td>
                                    <td>{settingData.creditPerTimber}</td>
                                    <td>{settingData.creditPerPlate}</td>
                                </tr>
                            </tbody>)}
                        </table>
                    </div>
                </div>
            </div>
        )
        };
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);
