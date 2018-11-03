import React, { Component } from 'react';
import { Button } from "react-bootstrap/lib";
import { TiBeer } from 'react-icons/ti';
import { FaSpinner } from 'react-icons/fa';

import '../App.css';

class SignIn extends Component {
  render() {
    const { startMachine, disabled } = this.props;

    return (
      <Button className="start-button" bsStyle="primary" bsSize="large" onClick={_ => startMachine() } disabled={disabled} block>
        {disabled? <FaSpinner className="icon-spin " /> : <TiBeer />} Start
      </Button>
    )
  }
}

export default SignIn;
