import React, { Component } from 'react';
import '../App.css';

class Stock extends Component {
  render() {
    const { drinks } = this.props

    return (
      <div className="container">
        <div className="row">
        {
          drinks.map((drink, i) => <div className={drink.stock > 2? 'col' : 'col low'} key={i}>
            <span className="card-text"><small>{drink.name}<br />{drink.stock}</small></span>
          </div>)
        }
        </div>
      </div>
    )
  }
}

export default Stock;
