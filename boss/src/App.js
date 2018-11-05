import React, { Component } from 'react';
import firebase from "./firebase";
import './App.css';

import Machine from './components/machine.component'

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

class App extends Component {

  state = {
    machines: [],
    transactions: [],
    revenue: {
      cash: 0,
      card: 0
    }
  }

  componentDidMount() {
    // listen to machine data
    db.collection("machines").onSnapshot((querySnapshot) => {
      this.setState({ machines: [] });
      querySnapshot.forEach((doc) => {
        let machines = this.state.machines
        let data = doc.data();
        data.id = doc.id;
        machines.push(data)
        this.setState({ machines: machines });
      });

    });

    // listen to machine data
    db.collection("transactions").onSnapshot((querySnapshot) => {
      this.setState({ transactions: [] });
      querySnapshot.forEach((doc) => {
        let transactions = this.state.transactions
        let data = doc.data();
        data.id = doc.id;
        data.timeStamp = new Date(data.timeStamp).toISOString().slice(0,10).replace(/-/g,"");
        transactions.push(data)
        this.setState({ transactions: transactions });
      });

    });
  }

  render() {
    const { machines, transactions } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h3>Machines</h3>

            <div className="card-columns">
              {
                machines.map((machine, i) => <Machine key={i} machine={machine} />)
              }
            </div>

            <h3>Transactions</h3>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Drink</th>
                  <th scope="col">Machine</th>
                  <th scope="col">Type</th>
                  <th scope="col">Time</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                {
                  transactions.map((transaction, i) => <tr key={i}>
                      <th scope="row">{i}</th>
                      <td>{transaction.drinkId}</td>
                      <td>{transaction.machineId}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.timeStamp}</td>
                      <td>{transaction.cost}</td>
                    </tr>)
                }

              </tbody>
            </table>


            <a
              className="App-link"
              href="https://github.com/ng-darren/vendingMachine"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
