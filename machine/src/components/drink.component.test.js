import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Drink from './drink.component';

configure({ adapter: new Adapter() });

beforeAll = () => {
  console.log = s => {
    process.stdout.write(s + "\n");
  };

}

describe('describing Drink ', () => {
  let item = {
    id: 'id',
    name: 'drink name',
    price: 10,
    stock: 10,
    image: ''
  },
  selected = false,
  cardClicked = function() {};

  it('should display drink name, stock, price ', () => {
    const cardClicked = function() {}
    const drink = shallow(<Drink drink={item} key={'one'} selected={selected===item.id?true:false} cardClicked={cardClicked} />);
    expect(drink.text()).toEqual('drink name10 left');
  });

  it('should highlight drink when clicked ', () => {
    const cardClicked = function() {}
    const drink = shallow(<Drink drink={item} key={'one'} selected={selected===item.id?true:false} cardClicked={cardClicked} />);
    expect(drink.text()).toEqual('drink name10 left');

    drink.find('div.card').first().simulate('click');
    expect(drink.find('div.card').first().hasClass('selected')).toEqual(false);
  });

});
