import React, { Component } from 'react';
import '../App.css';


class Drink extends Component {
  render() {
    const { drink, selected, cardClicked } = this.props

    return (<div className={drink.stock > 0? (selected? 'card selected' : 'card') : 'card disabled'}
                  onClick={() => drink.stock > 0? cardClicked(drink.id) : null}>
              <img className="card-img-top" src={drink.image} alt={drink.name} />
              <div className="card-body">
                <h5 className="card-title">{drink.name}</h5>
                <p className="card-text">&#36;{drink.price / 100}</p>
                <p className="card-text"><small className="text-muted">{drink.stock} left</small></p>
              </div>
            </div>)
  }
}

export default Drink;
