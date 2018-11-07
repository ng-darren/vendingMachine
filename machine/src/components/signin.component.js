import React, { Component } from 'react';
import { Button } from "react-bootstrap/lib";
import { TiBeer } from 'react-icons/ti';
import { FaSpinner } from 'react-icons/fa';

import '../App.css';

class SignIn extends Component {
  render() {
    const { startMachine, disabled } = this.props;

    return (
      <div className="start-button btn btn-primary btn-block" variant="primary" size="large" onClick={_ => startMachine()} disabled={disabled}>
        {disabled? <FaSpinner className="icon-spin" /> : <TiBeer />} Start
      </div>
    )
  }
}

export default SignIn;
