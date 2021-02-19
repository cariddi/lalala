import Api from '../../src/services/Api';
import ApiResponseError from '../../src/services/ApiResponseError';

function fakeResponse( status = 200, body = null ) {
	const statusText = {
		200: 'OK',
		400: 'Bad Request',
		404: 'Not Found',
		500: 'Internal Server Error'
	};

	return {
		status,
		statusText: statusText[ status ],
		ok: status >= 200 && status < 300,
		bodyUsed: false,
		json() {
			this.bodyUsed = true;
			return Promise.resolve( body );
		}
	};
}

function FetchMock( data = null, error = undefined ) {
	const request = {};
	request.fetch = ( url, req ) => {
		request.url = url;
		if ( req.method ) request.method = req.method;
		if ( req.headers ) request.headers = req.headers;
		if ( req.body ) request.body = req.body;
		if ( error !== undefined ) { return Promise.reject( error ); }

		if ( !data ) {
			return Promise.resolve( fakeResponse( 200 ) );
		}

		if ( data && !data.status ) {
			return Promise.resolve( fakeResponse( 200, data ) );
		}

		return Promise.resolve( data );
	};
	return request;
}

describe( 'Api', () => {
	const serviceCaller = method => ( before = null ) => {
		const request = FetchMock();
		const service = new Api( request.fetch );

		if ( before ) { before( service.headers ); }

		service[ method.toLowerCase() ]( 'http://www.google.com.ar/' );
		return [request, service];
	};

	const testsForMethodsWithHeaders = ( method ) => {
		const callService = serviceCaller( method );
		it( `makes a ${method.toUpperCase()} request`, () => {
			const [request] = callService();
			expect( request.method ).toEqual( method.toUpperCase() );
		} );
		it( `uses the ${method.toUpperCase()} method`, () => {
			const [request, service] = callService();
			expect( request.url ).toEqual( 'http://www.google.com.ar/' );
			service[ method.toLowerCase() ]( 'http://www.another.url.com/index.js' );
			expect( request.url ).toEqual( 'http://www.another.url.com/index.js' );
		} );
		it( 'accepts application/json by default', () => {
			const [request] = callService();
			expect( request.headers.Accept ).toEqual( 'application/json' );
		} );
		it( 'can change the Accept header', () => {
			const [request] = callService( ( headers ) => { headers.set( 'accept', 'text/html' ); } );
			expect( request.headers.Accept ).toEqual( 'text/html' );
		} );
		it( 'doesn\'t send Authorizaion header by default', () => {
			const [request] = callService();
			expect( request.headers.Authorization ).toBeUndefined();
		} );
		it( 'can change Authorization header', () => {
			const [request] = callService( ( headers ) => { headers.set( 'authorization', 'Token: peter' ); } );
			expect( request.headers.Authorization ).toEqual( 'Token: peter' );
		} );
		it( 'accepts custom headers', () => {
			const fakeHost = 'www.fake-google.com';
			const customHeader = 'Some custom value';
			const cookies = 'someValue=123; someToken=abcd';
			const [request] = callService( ( headers ) => {
				headers.set( 'Host', fakeHost );
				headers.set( 'X-Custom-Header', customHeader );
				headers.set( 'Cookie', cookies );
			} );
			expect( request.headers.Host ).toEqual( fakeHost );
			expect( request.headers[ 'X-Custom-Header' ] ).toEqual( customHeader );
			expect( request.headers.Cookie ).toEqual( cookies );
		} );
		it( 'returns a promise with the result of fetch', () => {
			expect.assertions( 1 );
			const request = FetchMock( 'hello' );
			const service = new Api( request.fetch );
			return service[ method.toLowerCase() ]( 'http://www.google.com.ar/' )
				.then( data => expect( data ).toEqual( 'hello' ) );
		} );
		it( 'returns a promise with the rejection from fetch', () => {
			expect.assertions( 1 );
			const request = FetchMock( null, 'Ooops, I did it again :-(' );
			const service = new Api( request.fetch );
			return service[ method.toLowerCase() ]( 'http://www.google.com.ar/' )
				.catch( error => expect( error ).toEqual( 'Ooops, I did it again :-(' ) );
		} );

		describe( 'when there is an error', () => {
			it( 'transforms an unsuccessfull HTTP response to an ApiResponseError', () => {
				expect.assertions( 1 );
				const responseBody = { hey: 'Not Found :-(' };
				const response = fakeResponse( 404, responseBody );
				const service = new Api( FetchMock( response ).fetch );
				return service[ method.toLowerCase() ]( 'http://www.google.com.ar/' )
					.catch( error => expect( error instanceof ApiResponseError ).toBe( true ) );
			} );
			it( 'includes the original response in the error', () => {
				expect.assertions( 1 );
				const responseBody = { hey: 'Not Found :-(' };
				const response = fakeResponse( 404, responseBody );
				const service = new Api( FetchMock( response ).fetch );
				return service[ method.toLowerCase() ]( 'http://www.google.com.ar/' )
					.catch( ( error ) => {
						expect( error.response ).toBe( response );
					} );
			} );
			it( 'includes the returned status code in the error', () => {
				expect.assertions( 1 );
				const responseBody = { hey: 'Not Found :-(' };
				const response = fakeResponse( 404, responseBody );
				const service = new Api( FetchMock( response ).fetch );
				return service[ method.toLowerCase() ]( 'http://www.google.com.ar/' )
					.catch( ( error ) => {
						expect( error.status ).toBe( 404 );
					} );
			} );
			it( 'includes the returned status code in the error', () => {
				expect.assertions( 1 );
				const responseBody = { hey: 'Not Found :-(' };
				const response = fakeResponse( 404, responseBody );
				const service = new Api( FetchMock( response ).fetch );
				return service[ method.toLowerCase() ]( 'http://www.google.com.ar/' )
					.catch( ( error ) => {
						expect( error.statusText ).toEqual( 'Not Found' );
					} );
			} );
			it( 'can parse the json of the body returned from the error', () => {
				expect.assertions( 1 );
				const responseBody = { hey: 'Not Found :-(' };
				const response = fakeResponse( 404, responseBody );
				const service = new Api( FetchMock( response ).fetch );
				return service[ method.toLowerCase() ]( 'http://www.google.com.ar/' )
					.catch( error => error.json() )
					.then( ( error ) => {
						expect( error ).toEqual( responseBody );
					} );
			} );
		} );

		describe( 'when the request returns json data', () => {
			describe( 'on successful response', () => {
				it( 'returns the parsed json body', () => {
					expect.assertions( 1 );
					const expectedData = { id: 1, content: 'entity content' };
					const service = new Api( FetchMock( expectedData ).fetch );
					return service[ method.toLowerCase() ]()
						.then( data => expect( data ).toEqual( expectedData ) );
				} );
			} );

			describe( 'on error response', () => {
				it( 'return the parsed json data on the error', () => {
					expect.assertions( 1 );
					const service = new Api( FetchMock( fakeResponse( 404, 'Ouch' ) ).fetch );
					return service[ method.toLowerCase() ]()
						.catch( error => error.json() )
						.then( data => expect( data ).toEqual( 'Ouch' ) );
				} );
			} );
		} );
	};

	const testsForMethodsWithBody = ( method ) => {
		const callService = serviceCaller( method );

		it( 'sends Content-Type header of application/json by default', () => {
			const [request] = callService();
			expect( request.headers[ 'Content-Type' ] ).toEqual( 'application/json' );
		} );

		it( 'can change the Content-Type header', () => {
			const [request] = callService( ( headers ) => { headers.set( 'content-type', 'text/plain' ); } );
			expect( request.headers[ 'Content-Type' ] ).toEqual( 'text/plain' );
		} );

		it( 'sends the body as a JSON string if the Content-Type is application/json', () => {
			const body = { hello: 'Hi!' };
			const request = FetchMock();
			const service = new Api( request.fetch );
			service[ method.toLowerCase() ]( 'http://www.google.com.ar/', body );
			expect( request.body ).toBe( JSON.stringify( body ) );
		} );

		it( 'doesn\'t transforms the body to json if the Content-Type is not application/json', () => {
			const body = { hello: 'Hi!' };
			const request = FetchMock();
			const service = new Api( request.fetch );
			service.headers.contentType = 'something/else';
			service[ method.toLowerCase() ]( 'http://www.google.com.ar/', body );
			expect( request.body ).toBe( body );
		} );
	};

	const testAll = ( method ) => {
		testsForMethodsWithHeaders( method );
		testsForMethodsWithBody( method );
	};

	describe( 'GET', () => testsForMethodsWithHeaders( 'GET' ) );
	describe( 'POST', () => testAll( 'POST' ) );
	describe( 'PUT', () => testAll( 'PUT' ) );
	describe( 'PATCH', () => testAll( 'PATCH' ) );
} );
