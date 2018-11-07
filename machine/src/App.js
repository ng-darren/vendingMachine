import React, { Component } from 'react';
import { Alert, Button } from "react-bootstrap/lib";
import firebase from "./firebase";
import { TiBeer } from 'react-icons/ti';

import Drink from './components/drink.component';
import Payment from './components/payment.component';
import SignIn from './components/signin.component';
import './App.css';

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

class App extends Component {
  startState = {};

  state = {
    machineId: '',
    drinks: [],
    revenue: {},
    selected: null,
    isLoading: true,
    isPaying: false,
    success: false
  }

  componentDidMount() {
    db.collection("startState").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            this.startState[doc.id] = doc.data()
        });

        this.startState.revenue = {
          cash: 0,
          card: 0
        }

        this.setState({ isLoading: false });
    });
  }

  startMachine = () => {
    return db.collection("machines").add(
      this.startState
    )
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);

      // listen to machine data
      db.collection("machines").doc(docRef.id).onSnapshot((doc) => {
        this.setState({ drinks: [] });
        let data = doc.data();

        for (var property in data) {
          if (data.hasOwnProperty(property)) {
            let drinks = this.state.drinks
            let dbObject = data[property]

            if (dbObject.name) {
              dbObject.id = property
              drinks.push(dbObject)
              this.setState({ drinks: drinks });
            } else {
              this.setState({ revenue: dbObject });
            }
          }
        }
      });

      this.setState({ machineId: docRef.id });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  cardClicked = (e) => {
    this.setState({ selected: this.state.selected === e? null : e, success: false })
  }

  checkId = (drink) => {
    return drink.id === this.state.selected;
  }

  submitPayment = (type) => {
    const selectedDrink = this.state.drinks.find(this.checkId);
    this.setState({ isPaying: true, success: false });

    return db.collection("transactions").add({
      machineId: this.state.machineId,
      drinkId: selectedDrink.id,
      type: type,
      cost: selectedDrink.price,
      timeStamp: Math.round((new Date()).getTime())
    })
    .then((docRef) => {
      let drinkUpdate = {};
      drinkUpdate[selectedDrink.id] = selectedDrink;
      drinkUpdate[selectedDrink.id].stock = selectedDrink.stock - 1;
      db.collection("machines").doc(this.state.machineId).update(drinkUpdate)
        .then(() => {
          let revenueUpdate = this.state.revenue;
          revenueUpdate[type] = revenueUpdate[type] + selectedDrink.price;
          db.collection("machines").doc(this.state.machineId).update({ revenue: revenueUpdate })
            .then(() => {
              console.log("Document successfully updated!");
              this.setState({ selected : null, isPaying: false, success: true });
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  exitMachine = () => {
    this.setState({
        machineId: '',
        drinks: [],
        revenue: {},
        selected: null,
        isLoading: false,
        isPaying: false
      })
  }

  render() {
    const { isLoading, machineId, drinks, selected, success } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            {!machineId && <h3 id="title">Vending Machine</h3>}
            {machineId && <h3 id="machineId">Machine {machineId}</h3>}
            <br />
            <br />
            <br />
            {!machineId && <SignIn startMachine={this.startMachine} disabled={isLoading} />}

            {
              success && <Alert id="successAlert" dismissible variant="success">
                <TiBeer /> Payment successful, get a drink!
              </Alert>
            }

            {
              machineId && <div className="card-deck">
              {
                drinks.map((item, i) => <Drink drink={item} key={i} selected={selected===item.id?true:false} cardClicked={this.cardClicked} />)
              }
              </div>
            }

            {selected && <Payment submitPayment={this.submitPayment} /> }

            <a
              className="App-link"
              href="https://github.com/ng-darren/vendingMachine"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <br />
            <br />
            { machineId &&
              <Button className="exit-button" variant="danger" size="small" onClick={this.exitMachine}>
               Exit
              </Button>
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
