import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
import { trls } from '../../components/translate';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
});
class Buycreditform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            number:'',
            pricePercentData: [],
            creditAmount: 0,
            vatAmount: 0,
            totalAmount: 0
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this.getPricePerCredit();
    }
    getPricePerCredit = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetSettingData, headers)
        .then(result => {
            this.setState({pricePercentData:result.data})
        });
    }
    changeNumber = (ev) => {
        let pricePercentData = this.state.pricePercentData;
        this._isMounted=true
        if(this._isMounted){
            this.setState({number:ev.target.value})
            this.setState({creditAmount: ev.target.value*pricePercentData.pricePerCredit})
            this.setState({vatAmount: ev.target.value*pricePercentData.vatPercentage*pricePercentData.pricePerCredit/100})
            this.setState({totalAmount: ev.target.value*pricePercentData.vatPercentage*pricePercentData.pricePerCredit/100 + ev.target.value*pricePercentData.pricePerCredit})
        }
       
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const clientFormData = new FormData(event.target);
        const data = {};
        for (let key of clientFormData.keys()) {
            data[key] = clientFormData.get(key);
        }
        var params = {
            "numberOfCreditsToBuy":this.state.number,
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.post(API.PostSisowData, params, headers)
        .then(result => {
            window.open(result.data.transaction.issuerUrl);
            this.props.onHide();
        })
        .catch(err => {
        });
    }
    render(){   
        return (
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop= "static"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {trls('Buy_Credits')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="container product-form credit-form" onSubmit = { this.handleSubmit }>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            {trls('Number_of_Credits')}
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" name="number" required placeholder={trls('Number_of_Credits')} value={this.state.number} onChange={this.changeNumber} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            {trls('Credits_Amount')} 
                        </Form.Label>
                        <Col sm="8" >
                            <Form.Control type="text" readOnly name="amount" value={this.state.creditAmount} required placeholder="Credits Amount" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            {trls('VAT_amount')} 
                        </Form.Label>
                        <Col sm="8" >
                            <Form.Control type="text" readOnly name="amount" value={this.state.vatAmount} required placeholder={trls('VAT_amount')} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            {trls('Total_amount')} 
                        </Form.Label>
                        <Col sm="8" >
                            <Form.Control type="text" readOnly name="amount" value={this.state.totalAmount} required placeholder={trls('Total_amount')} />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <Button type="submit" style={{width:"100px"}}>{trls('Buy')}</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buycreditform);