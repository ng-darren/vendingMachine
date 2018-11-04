import React, { Component } from 'react';
import '../App.css';


class Stock extends Component {

  state = {

  }

  colors = ['#ff3902', '#ff8007', '#ffb404', '#05badd', '#2b4871']

  render() {
    const { drinks } = this.props

    return (
      <div className="container">
        <div className="row">
        {
          drinks.map((drink, i) => <div className="col" key={i}>
            <h5 className="card-text">{drink.name}</h5>
            <h5 className="card-text">{drink.stock}</h5>
          </div>)
        }
        </div>
      </div>
    )
  }
}

export default Stock;
