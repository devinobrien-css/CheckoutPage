import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';

/** Returns a formatted address
 * 
 * @param {*} props 
 * @returns given props in format of an address
 */
 const Card = (props) => {

	var protectedNumber = "**** **** **** "  + props.cardNumber.charAt(12) + props.cardNumber.charAt(13) + props.cardNumber.charAt(14) + props.cardNumber.charAt(15);
	return (
		<div>
			<p>{protectedNumber}, {props.expiration}</p>
		</div>
	)
}

/** Handles data of shipping form
 * 
 */
export default class CardForm extends React.Component {
	
	cardData;


	constructor(props) {
		super(props);

		this.updateInputState = this.updateInputState.bind(this);

		this.onChangeNumber = this.onChangeNumber.bind(this);
		this.onChangeExpiration = this.onChangeExpiration.bind(this);
		this.onChangeCVV = this.onChangeCVV.bind(this);
		
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			inputState: 'NEUTRAL',
			cardNumber: '',
			expiration: '',
			CVV: ''
		}
	}

	updateInputState(input){
		this.setState({inputState : input})
	}
	onChangeNumber(e) {
		this.setState({ cardNumber: e.target.value })
	}
	onChangeExpiration(e) {
		this.setState({ expiration: e.target.value })
	}
	onChangeCVV(e) {
		this.setState({ CVV: e.target.value })
	}


	validateFull() {
		return !(this.state.cardNumber === '') && !(this.state.expiration === '') && !(this.state.CVV === '');
  	}	
	onSubmit(e) {
		e.preventDefault();

		// if user has inputted all required fields
		if(this.validateFull()) {
			// remove warning if applicable
			if(document.querySelector("#empty-form-alert")){
				document.querySelector("#empty-form-alert").style.opacity = 0;
				setTimeout(() => {
                    document.querySelector('#empty-form-alert').remove();
                }, 1000);
			}

			this.updateInputState("FULL");
		}
		else{
			ReactDOM.render(<div id='empty-form-alert'><p>Please fill out all required fields</p></div>, document.querySelector('#alert-box'));
		}
	}
  	componentDidMount() {
		this.cardData = JSON.parse(localStorage.getItem('cardData'));

		//if user data already stored, read in and set from storage
		if (localStorage.getItem('cardData')) {
			this.setState({
				inputState: this.cardData.inputState,
				cardNumber: this.cardData.cardNumber,
				expiration: this.cardData.expiration,
				CVV: this.cardData.CVV
			})
		} 
		//otherwise, initialize empty state
		else {
			this.setState({
				inputState: 'NEUTRAL',
				cardNumber: '',
				expiration: '',
				CVV: ''
			})
		}
	}
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('cardData', JSON.stringify(nextState));
	}

	render(){
		if(this.state.inputState === "NEUTRAL") {
			return (
				<div className="container">
					<div id="alert-box"></div>
					<form onSubmit={this.onSubmit} className="shipping-form">
						<div>
							<div className="form-group">
								<label>Card Number</label>
								<input type="card" className="form-control" value={this.state.cardNumber} onChange={this.onChangeNumber} />
							</div>
							<div className="form-group">
								<label>Expiration</label>
								<input type="text" className="form-control" value={this.state.expiration} onChange={this.onChangeExpiration} />
							</div>
							<div className="form-group">
								<label>CVV</label>
								<input type="text" className="form-control" value={this.state.CVV} onChange={this.onChangeCVV} />
							</div>
						</div>  
						<button type="submit" className="btn btn-primary btn-block">Save Address</button>
					</form>
				</div>
			)
		}
		else if (this.state.inputState === "FULL") {
			return (
				<div className="user-data">
					<Card cardNumber={this.state.cardNumber} expiration={this.state.expiration}/>
					<button onClick={() => this.updateInputState("NEUTRAL")}>Edit Card Info</button>
				</div>
			)
		}
		else {
			return (
				<p>error</p>
			)
		}
  	}	
  
}