import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';

/** Returns a formatted address
 * 
 * @param {*} props 
 * @returns given props in format of an address
 */
 const Address = (props) => {
	return (
		<div>
			<p>{props.first} {props.last}</p>
			<p>{props.street}</p>
			<p>{props.city}, {props.state} {props.zip}</p>
		</div>
	)
}

/** Handles data of shipping form
 * 
 */
export default class ShippingForm extends React.Component {
	
	userData;


	constructor(props) {
		super(props);

		this.updateInputState = this.updateInputState.bind(this);

		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangeAptNumber = this.onChangeAptNumber.bind(this);
		this.onChangeStreetName = this.onChangeStreetName.bind(this);
		this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
		this.onChangeCity = this.onChangeCity.bind(this);
		this.onChangeState = this.onChangeState.bind(this);
		this.onChangeZip = this.onChangeZip.bind(this);
		
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			inputState: 'NEUTRAL',
			first: '',
			last: '',
			aptNumber: '',
			streetName: '',
			companyName: '',
			city: '',
			state: '',
			zip: ''
		}
	}

	updateInputState(input){
		this.setState({inputState : input})
	}
	onChangeFirstName(e) {
		this.setState({ first: e.target.value })
	}
	onChangeLastName(e) {
		this.setState({ last: e.target.value })
	}
	onChangeAptNumber(e) {
		this.setState({ aptNumber: e.target.value })
	}
	onChangeStreetName(e) {
		this.setState({ streetName: e.target.value })
	}
	onChangeCompanyName(e) {
		this.setState({ companyName: e.target.value })
	}
	onChangeCity(e) {
		this.setState({ city: e.target.value })
	}
	onChangeState(e) {
		this.setState({ state: e.target.value })
	}
	onChangeZip(e) {
		this.setState({ zip: e.target.value })
	}


	validateFull() {
		return !(this.state.first === '') && !(this.state.last === '') && !(this.state.streetName === '') && !(this.state.city === '') && !(this.state.state === '') && !(this.state.zip === '');
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
		this.userData = JSON.parse(localStorage.getItem('user'));

		//if user data already stored, read in and set from storage
		if (localStorage.getItem('user')) {
			this.setState({
				inputState: this.userData.inputState,
				first: this.userData.first,
				last: this.userData.last,
				aptNumber: this.userData.aptNumber,
				streetName: this.userData.streetName,
				companyName: this.userData.companyName,
				city: this.userData.city,
				state: this.userData.state,
				zip: this.userData.zip
			})
		} 
		//otherwise, initialize empty state
		else {
			this.setState({
				inputState: 'NEUTRAL',
				first: '',
				last: '',
				aptNumber: '',
				streetName: '',
				companyName: '',
				city: '',
				state: '',
				zip: ''
			})
		}
	}
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('user', JSON.stringify(nextState));
	}

	render(){
		if(this.state.inputState === "NEUTRAL") {
			return (
				<div className="container">
					<div id="alert-box"></div>
					<form onSubmit={this.onSubmit} className="shipping-form">
						<div>
							<div className="form-group">
								<label>First Name</label>
								<input type="text" className="form-control" value={this.state.first} onChange={this.onChangeFirstName} />
							</div>
							<div className="form-group">
								<label>Last Name</label>
								<input type="text" className="form-control" value={this.state.last} onChange={this.onChangeLastName} />
							</div>
							<div className="form-group">
								<label>Apt / Suite (optional)</label>
								<input type="text" className="form-control" value={this.state.aptNumber} onChange={this.onChangeAptNumber} />
							</div>
							<div className="form-group">
								<label>House Number/Street Address</label>
								<input type="text" className="form-control" value={this.state.streetName} onChange={this.onChangeStreetName} />
							</div>
							<div className="form-group">
								<label>Company Name (optional)</label>
								<input type="text" className="form-control" value={this.state.companyName} onChange={this.onChangeCompanyName} />
							</div>
							<div className="form-group">
								<label>City</label>
								<input type="text" className="form-control" value={this.state.city} onChange={this.onChangeCity} />
							</div>
							<div className="form-group">
								<label>State</label>
								<input type="state" className="form-control" value={this.state.state} onChange={this.onChangeState} />
							</div>
							<div className="form-group">
								<label>Zip</label>
								<input type="number" className="form-control" value={this.state.zip} onChange={this.onChangeZip} />
							</div>
						</div>  
						<button type="submit" className="btn btn-primary btn-block">Save Shipping Address</button>
					</form>
				</div>
			)
		}
		else if (this.state.inputState === "FULL") {
			return (
				<div className="user-data">
					<Address first={this.state.first} last={this.state.last} street={this.state.streetName} state={this.state.state} city={this.state.city} zip={this.state.zip}/>
					<button onClick={() => this.updateInputState("NEUTRAL")}>Edit Shipping Address</button>
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