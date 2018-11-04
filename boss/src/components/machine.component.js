import React, { Component } from 'react';
import firebase from "../firebase";
import { Button } from "react-bootstrap/lib";
import { TiBeer } from 'react-icons/ti';
import { FaSpinner } from 'react-icons/fa';
import '../App.css';

import Stock from './stock.component'

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

class Machine extends Component {

  state = {
    drinks: [],
    revenue: {},
    disabled: false
  }

  startState = {};
  unsubscribe = null;

  componentDidMount() {
    console.log(this.props.machine)
    for (var property in this.props.machine) {
      if (this.props.machine.hasOwnProperty(property)) {
        let drinks = this.state.drinks
        let dbObject = this.props.machine[property]

        if (dbObject.name) {
          dbObject.id = property
          drinks.push(dbObject)
          this.setState({ drinks: drinks });
        } else if (dbObject.hasOwnProperty('cash') || dbObject.hasOwnProperty('card')) {
          this.setState({ revenue: dbObject });
          console.log(dbObject)
        }
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  stockUp = () => {
    console.log('stockUp')
    this.setState({ disabled: true });

    this.unsubscribe = db.collection("startState").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            this.startState[doc.id] = doc.data()
        });

        this.startState.revenue = {
          cash: 0,
          card: 0
        }

        db.collection("machines").doc(this.props.machine.id).update(this.startState)
          .then(() => {
            console.log("Document successfully updated!");
            this.setState({ disabled: false });
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            this.setState({ disabled: false });
          });
    });
  }

  render() {
    const { machine } = this.props
    const { drinks, revenue, disabled } = this.state;

    return (<div className="card">
              <div className="card-body">
                <h5 className="card-title">{machine.id}</h5>
                <p className="card-text">
                  <small>Cash: &#36;{revenue.cash / 100 + (revenue.cash > 0? '0' : '')}</small>
                  <br />
                  <small>Card: &#36;{revenue.card / 100 + (revenue.cash > 0? '0' : '')}</small>
                </p>

                <Stock drinks={drinks} />

                <Button className="start-button" bsStyle="danger" bsSize="sm" onClick={this.stockUp} disabled={disabled} block>
                  {disabled? <FaSpinner className="icon-spin " /> : <TiBeer />} Stock Up
                </Button>
              </div>
            </div>)
  }
}

export default Machine;
