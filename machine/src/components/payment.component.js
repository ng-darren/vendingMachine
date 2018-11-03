import React, { Component } from 'react';
import { Button } from "react-bootstrap/lib";
import '../App.css';


class Payment extends Component {
  state = {
    type: null
  }

  paymentSelected = (type) => {
    console.log('paymentSelected', type);
    this.setState({ type: this.state.type === type? null : type })
  }

  pay = () => {
    this.props.submitPayment(this.state.type)
  }

  render() {
    const { type } = this.state;

    return (
      <div className="payment-container">
        <div className="card-deck">
          <div className={type === 'cash'? 'card selected' : 'card'} onClick={() => this.paymentSelected('cash')}>
            <div className="card-body">
              <h3 className="card-title">Cash</h3>
            </div>
          </div>
          <div className={type === 'card'? 'card selected' : 'card'} onClick={() => this.paymentSelected('card')}>
            <div className="card-body">
              <h3 className="card-title">Credit Card</h3>
            </div>
          </div>
        </div>

        <Button bsStyle="success" bsSize="large" disabled={!type} onClick={this.pay} block>Pay</Button>
      </div>
    )
  }
}

export default Payment;
