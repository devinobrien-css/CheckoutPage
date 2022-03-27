import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import './Checkout.css';
import ShippingForm from './CheckoutForms/ShippingForm.js';
import CardForm from './CheckoutForms/CardForm.js';
import BillingForm from './CheckoutForms/BillingForm.js';
import GenerateOrder from './OrderProcessor.js';

var cart = null;

/** Creates and returns the company header containing company name and logo
 * 
 * @returns a copy of the general company header
 */
const CompanyHeader = () => {
	return (
		<header className="company-header" id="observed">
			<div id="observed">
				<img src="./company-logo.jpeg" alt="Company Logo"/>
				<div>
				<p>Costa Coffee Roasters</p>
				<p>Small batches, sourced sustainably.</p>
				</div>
			</div>
		</header>
	)
}

/** Appears to user when their cart is empty
 * 
 * @returns section telling user their cart is empty 
 */
const EmptyCartSection = () => {
	return  (
		<section className="empty-cart-section">
		<p>Your cart is empty.</p>
		<p>Have an account? Sign in to view your saved cart. No account? Continue shopping.</p>
		<button href="#" target="_self">Sign In</button><button href="#" target="_self">Continue Shopping</button>
		</section>
	)
}

const ShippingSection = () => {
  return (
    <section className="shipping-section">
      <p>Please provide your shipping information below.</p>
      <ShippingForm />
    </section>
  )
}
 
const BillingSection = () => {
	return (
		<section className="billing-section">
		<p>Please provide your billing address below.</p>
		<BillingForm />
		<br/>
		<p>Please provide a payment method.</p>
		<CardForm />
		</section>
	)
}

const ReviewOrderSection = () => {
	return (
		<section className="review-section">
		<p>Please review your order below.</p>
		<GenerateOrder cart={cart}/>
		</section>
	)
}


/** Toggles between checkout options 
 * 
 * @param {*} option 
 */
function checkoutOptionSelect(option){
  if(option === "SHIPPING"){
    document.querySelector("button#checkout-shipping-btn").classList.add("selected");
    document.querySelector("button#checkout-billing-btn").classList.remove("selected");
    document.querySelector("button#checkout-review-btn").classList.remove("selected");

    ReactDOM.render( <ShippingSection />, document.querySelector("#checkout-option-container"));
  }
  else if(option === "BILLING"){
    document.querySelector("button#checkout-shipping-btn").classList.remove("selected");
    document.querySelector("button#checkout-billing-btn").classList.add("selected");
    document.querySelector("button#checkout-review-btn").classList.remove("selected");

    ReactDOM.render( <BillingSection />, document.querySelector("#checkout-option-container"));
  }
  else if(option === "REVIEW"){
    document.querySelector("button#checkout-shipping-btn").classList.remove("selected");
    document.querySelector("button#checkout-billing-btn").classList.remove("selected");
    document.querySelector("button#checkout-review-btn").classList.add("selected");

    ReactDOM.render( <ReviewOrderSection />, document.querySelector("#checkout-option-container"));
  }
  else{

  }
}

/**
 * 
 */
const CheckoutContainer = () => {
  return (
    <section className="checkout-section">
      <p>Proceed To Checkout</p>
      <div>
        <div><button id="checkout-shipping-btn" onClick={() => checkoutOptionSelect("SHIPPING")}>Shipping</button><button id="checkout-billing-btn" onClick={() => checkoutOptionSelect("BILLING")}>Billing</button><button id="checkout-review-btn" onClick={() => checkoutOptionSelect("REVIEW")}>Review</button></div>
        <div id="checkout-option-container"></div>
      </div>
    </section>
  )
}

function Checkout(props) {
	var checkoutSection;

	cart = props.cart;

	if(props.cart === null){
		checkoutSection = <EmptyCartSection />;
	}
	else{
		checkoutSection = <CheckoutContainer />
	}



	return (
		<>
		<CompanyHeader />
		{checkoutSection}
		</>
	);
}

export default Checkout;
