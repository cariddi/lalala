import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectComponent } from '../../lib/connectComponent';
import { 
    getContactDataSelector,
    getCountriesSelector,
    getStatesSelector
} from '../../selectors/contacts';
// import FormComponent from '../../components/FormComponent';
import EditComponent from '../../components/EditComponent';

export class ContainerViewContact extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
		this.fetchContactData(id);
	}

    get contactData() { return this.props.contactData; }
    get countries() { return this.props.countries; }
    get states() { return this.props.states; }

    fetchContactData() { this.props.fetchContactData( this.props.match.params.id ); }
    fetchCountries() { this.props.fetchCountries(); }
    fetchStates() { this.props.fetchStates( this.contactData.country.id ); }

    editContactData() { this.props.editContactData( this.contactData.id, this.contactData ); }

    onFetchCountry = countryId => {
        this.props.fetchStates( countryId );
    }

    handleSubmit = formValues => {
        console.log('SUBMIT VALUES: ', formValues);
        this.editContactData( formValues.id, formValues );
    }

	render() {
        const { contactData, countries, states } = this;

		return (
            <EditComponent 
                initialValues={contactData} 
                onSubmit={this.handleSubmit} 
                onFetchCountry={this.onFetchCountry}
                countries={countries}
                states={states}
            />
        )
    }
}

ContainerViewContact.propTypes = {
    contactData: PropTypes.any,
    countries: PropTypes.any,
    states: PropTypes.any,
    
    fetchContactData: PropTypes.func.isRequired,
    fetchCountries: PropTypes.func.isRequired,
    fetchStates: PropTypes.func.isRequired,
    editContactData: PropTypes.func.isRequired
};

ContainerViewContact.defaultProps = {
    contactData: undefined,
    countries: undefined,
    states: undefined,
};

export default connectComponent( ( state, props ) => ( {
    fetchContactDataRequest: state.fetchContactDataRequest, //reducer
	fetchCountriesRequest: state.fetchCountriesRequest, //reducer
	fetchStatesRequest: state.fetchStatesRequest, //reducer
    editContactRequest: state.editContactRequest, //reducer
    contactData: getContactDataSelector( state, props ), //selector
    countries: getCountriesSelector( state, props ), //selector
    states: getStatesSelector( state, props ) //selector
} ) )( ContainerViewContact );
