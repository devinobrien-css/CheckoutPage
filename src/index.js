import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Checkout from './Checkout';


function fetchCartData(scenario) {
    if(scenario === 1) {
        return ['A', 'A', 'B', 'C', 'C', 'D'];
    }
    else if(scenario === 2){
        return ['A', 'A', 'A', 'A','A', 'B','B','B', 'B', 'C', 'D'];
    }
    else if(scenario === 3){
        return ['A','B','B','C','D','D','D'];
    }
    else {
        return null; 
    }
}


ReactDOM.render(
  <React.StrictMode>
    <Checkout cart={fetchCartData(2)} />
  </React.StrictMode>,
  document.getElementById('root')
);

document.querySelector('#checkout-shipping-btn').click();
