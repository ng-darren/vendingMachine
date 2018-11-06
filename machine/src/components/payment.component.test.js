import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Payment from './payment.component';

configure({ adapter: new Adapter() });

describe('describing Payment ', () => {

  it('should highlight card when clicked ', () => {
    const submitPayment = function() {}
    const payment = shallow(<Payment submitPayment={submitPayment} />);
    expect(payment.text()).toEqual('CashCredit Card$ Pay');

    payment.find('div.card#cash').simulate('click');
    expect(payment.find('#cash').hasClass('selected')).toEqual(true);
  });

  it('should show spinner when cash and pay clicked', () => {
    const submitPayment = function() {}
    const payment = shallow(<Payment submitPayment={submitPayment} />);
    expect(payment.text()).toEqual('CashCredit Card$ Pay');

    payment.find('div.card#cash').simulate('click');
    payment.find('#pay').simulate('click');
    expect(payment.text()).toEqual('CashCredit Card<FaSpinner /> Pay');
  });

});
