import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectComponent } from '../../lib/connectComponent';
import { getContacts } from '../../selectors/contacts';

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
                Contact List
                {
                    this.props.contacts ?

                    this.props.contacts.map((c, idx) => {
                        return (
                            <li key={idx}>{c.id - c.name}</li>
                        )
                    })
                    :
                    <p>No contacts</p>
                }
            </div>
        )
    }
}

ContainerListContacts.propTypes = {
	contacts: PropTypes.any,
	fetchContacts: PropTypes.func.isRequired
};

ContainerListContacts.defaultProps = {
	contacts: undefined
};

export default connectComponent( ( state, props ) => ( {
	fetchContactsRequest: state.fetchContactsRequest, //reducer
	contacts: getContacts( state, props ) //selector
} ) )( ContainerListContacts );
