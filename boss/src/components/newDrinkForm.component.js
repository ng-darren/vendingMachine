import React, { Component } from 'react';
import firebase from "../firebase";
import { Form, Button } from "react-bootstrap/lib";
import { TiBeer } from 'react-icons/ti';
import '../App.css';

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

class NewDrink extends Component {

  state = {
    image: '',
    name: '',
    price: 0,
    stock: 0,
    validated: false,
    show: true
  }

  handleChange = (event) => {
    let stateObject = this.state;
    stateObject[event.target.name] = event.target.value
    this.setState(stateObject);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const machineRef = db.collection("machines").doc(this.props.machineId);
      let newDrink = {}
      newDrink[this.state.name] = {
        image: this.state.image,
        name: this.state.name,
        price: this.state.price,
        stock: this.state.stock
      }
      return machineRef.update(newDrink)
      .then(() => {
          console.log("Document successfully updated!");
          this.setState({ validated: true });
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          this.setState({ validated: true });
      });
    }

    this.setState({ validated: true });
  }

  render() {
    const { image, name, price, stock, validated } = this.state;

    return (
      <div className="new-drink-form">
        <h5>Add New Drink</h5>

        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" id="name" placeholder="Name" value={name} onChange={this.handleChange} required />
            <div className="invalid-feedback"> Required Field</div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Price</label>
            <input type="text" className="form-control" name="price" id="price" placeholder="Price" pattern="[0-9]+" value={price} onChange={this.handleChange} required />
            <div className="invalid-feedback"> Price in cents only</div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Stock</label>
            <input type="text" className="form-control" name="stock" id="stock" placeholder="Stock" pattern="[0-9]+" value={stock} onChange={this.handleChange} required />
            <div className="invalid-feedback"> Stock must be in numbers</div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Image Url</label>
            <input type="text" className="form-control" name="image" id="image" placeholder="Image Url" value={image} onChange={this.handleChange} />
          </div>

          <Button className="submit-button" variant="primary" type="submit" size="sm" block>
            <TiBeer /> Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default NewDrink;
