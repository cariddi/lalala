import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectComponent } from '../../lib/connectComponent';
import { getContactDataSelector } from '../../selectors/contacts';
import ViewComponent from '../../components/ViewComponent'

export class ContainerViewContact extends Component {
    componentWillMount() {
        const { id } = this.props.match.params;
		if ( !this.props.contactData ) { this.fetchContactData(id); }
	}

    get contactData() { return this.props.contactData; }

    fetchContactData() { this.props.fetchContactData( this.props.match.params.id ); }

	render() {
        const { contactData } = this;

		return <ViewComponent contactData={contactData} />
    }
}

ContainerViewContact.propTypes = {
	contactData: PropTypes.any,
	fetchContactData: PropTypes.func.isRequired
};

ContainerViewContact.defaultProps = {
    contactData: undefined,
};

export default connectComponent( ( state, props ) => ( {
	fetchContactDataRequest: state.fetchContactDataRequest, //reducer
    contactData: getContactDataSelector( state, props ), //selector
} ) )( ContainerViewContact );
