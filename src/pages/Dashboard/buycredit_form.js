import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
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
            pricePerCredit:'',
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
            this.setState({pricePerCredit:result.data.pricePerCredit})
        });
    }
    changeNumber = (ev) => {
        this._isMounted=true
        if(this._isMounted){
            this.setState({number:ev.target.value})
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
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Buy Credits
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="container product-form credit-form" onSubmit = { this.handleSubmit }>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Number of Credits    
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" name="number" required placeholder="Number of Credits" value={this.state.number} onChange={this.changeNumber} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Credits Amount    
                        </Form.Label>
                        <Col sm="8" >
                            <Form.Control type="text" readOnly name="amount" value={this.state.number*this.state.pricePerCredit} required placeholder="Credits Amount" />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <Button type="submit" style={{width:"100px"}}>BUY</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buycreditform);