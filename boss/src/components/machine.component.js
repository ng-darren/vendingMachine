import React, { Component } from 'react';
import firebase from "../firebase";
import { Button } from "react-bootstrap/lib";
import { TiBeer, TiCancel } from 'react-icons/ti';
import { FaSpinner } from 'react-icons/fa';
import * as CurrencyFormat from 'react-currency-format';

import '../App.css';

import Stock from './stock.component'
import NewDrinkFrom from './newDrinkForm.component'

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

class Machine extends Component {

  state = {
    drinks: [],
    revenue: {},
    showAddNew: false,
    disabled: false
  }

  startState = {};

  componentDidMount() {
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
        }
      }
    }
  }

  stockUp = () => {
    this.setState({ disabled: true });

    db.collection("startState").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
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

  addNew = () => {
    this.setState({ showAddNew : !this.state.showAddNew })
  }

  render() {
    const { machine } = this.props
    const { drinks, revenue, showAddNew, disabled } = this.state;

    return (<div className="card">
              <div className="card-body">
                <h5 className="card-title">{machine.id}</h5>
                <hr />

                <p className="card-text">
                  Cash: <CurrencyFormat value={revenue.cash / 100} displayType={'text'} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                  <br />
                  Card: <CurrencyFormat value={revenue.card / 100} displayType={'text'} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                </p>

                <hr />
                <Stock drinks={drinks} />

                <br />
                <Button className="start-button" variant="success" size="sm" onClick={this.stockUp} disabled={disabled} block>
                  {disabled? <FaSpinner className="icon-spin " /> : <TiBeer />} Stock Up
                </Button>

                { showAddNew && <NewDrinkFrom machineId={this.props.machine.id} /> }
                <Button className="start-button" variant={ showAddNew? 'danger' : 'primary' } size="sm" onClick={this.addNew} disabled={disabled} block>
                  {disabled? <FaSpinner className="icon-spin " /> : (showAddNew? <TiCancel /> : <TiBeer />) } { showAddNew? 'Cancel' : 'Add new' }
                </Button>
              </div>

            </div>)
  }
}

export default Machine;
