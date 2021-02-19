import { handle } from 'redux-pack';

export function asyncActionHandler( state, action ) {
	return handle( state, action, {
		start: prevState => ( {
			...prevState, sending: true, error: null, success: false
		} ),
		failure: prevState => ( {
			...prevState, sending: false, error: action.payload, success: false
		} ),
		success: prevState => ( {
			...prevState, sending: false, error: null, success: true
		} )
	} );
}
