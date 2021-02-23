import ApiHeaders from './ApiHeaders';
import ApiResponseError from './ApiResponseError';

export default class Api {
	constructor( fetchBackend = fetch.bind( window ) ) {
		this.fetch = fetchBackend;
		this.headers = new ApiHeaders();
	}
	__options( method, body = undefined ) {
		const options = {
			method,
			headers: this.headers.toDictionary()
		};
		if ( body !== undefined ) {
			if ( this.headers.contentType === 'application/json' ) {
				options.body = JSON.stringify( body );
			} else {
				options.body = body;
			}
		}
		return options;
	}
	__request( method, url, body = undefined ) {
		return this
			.fetch( url, this.__options( method, body ) )
			.then( ( response ) => {
				if ( !response.ok ) {
					throw new ApiResponseError( response );
				}
				return response;
			} );
	}

	get( url ) {
		return this.__request( 'GET', url ).then( data => data.json() );
	}

	post( url, body = undefined ) {
		return this.__request( 'POST', url, body ).then( data => data.json() );
	}

	patch( url, body = undefined ) {
		return this.__request( 'PATCH', url, body ).then( data => data.json() );
	}
	
	put( url, body = undefined ) {
		return this.__request( 'PUT', url, body ).then( data => data.json() );
	}

}