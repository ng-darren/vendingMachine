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
  }

  render() {
    const { machines } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <div className="card-columns">
              {
                machines.map((machine, i) => <Machine key={i} machine={machine} />)
              }
            </div>

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
