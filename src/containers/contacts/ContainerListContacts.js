import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectComponent } from '../../lib/connectComponent';
import { getContactsSelector } from '../../selectors/contacts';
import TableComponent from '../../components/TableComponent'

export class ContainerListContacts extends Component {
    componentWillMount() {
		if ( !this.contacts ) { this.fetchContacts(); }
	}

    get contacts() { return this.props.contacts; }

    fetchContacts() { this.props.fetchContacts( ); }

	render() {
        const { contacts } = this;

		return (
            <div className='ListContacts'>
                <h2>Contact List</h2>
                <TableComponent contacts={contacts} />
            </div>
        )
    }
}

ContainerListContacts.propTypes = {
	contacts: PropTypes.any,
	fetchContacts: PropTypes.func.isRequired
};

ContainerListContacts.defaultProps = {
    contacts: undefined,
};

export default connectComponent( ( state, props ) => ( {
	fetchContactsRequest: state.fetchContactsRequest, //reducer
    contacts: getContactsSelector( state, props ), //selector
} ) )( ContainerListContacts );
