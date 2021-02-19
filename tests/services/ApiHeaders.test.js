import ApiHeaders from '../../src/services/ApiHeaders';

describe( 'ApiHeaders', () => {
	test( 'has Accept of application/json by default', () => {
		const headers = new ApiHeaders();
		expect( headers.accept ).toEqual( 'application/json' );
	} );
	test( 'has Content-Type of application/json by default', () => {
		const headers = new ApiHeaders();
		expect( headers.contentType ).toEqual( 'application/json' );
	} );
	test( 'has no Authorization header by default', () => {
		const headers = new ApiHeaders();
		expect( headers.authorization ).toBeUndefined();
	} );
	test( 'allows to change the Accept header', () => {
		const headers = new ApiHeaders();
		headers.accept = 'application/octet-stream';
		expect( headers.accept ).toEqual( 'application/octet-stream' );
	} );
	test( 'allows to change the Content-Type header', () => {
		const headers = new ApiHeaders();
		headers.contentType = 'text/plain';
		expect( headers.contentType ).toEqual( 'text/plain' );
	} );
	test( 'allows to change the Authorization header', () => {
		const headers = new ApiHeaders();
		headers.authorization = 'Token: some token';
		expect( headers.authorization ).toEqual( 'Token: some token' );
	} );
	test( 'allows to set custom headers', () => {
		const headers = new ApiHeaders();
		headers.set( 'X-Custom-Header', 'Hello' );
		expect( headers.get( 'X-Custom-Header' ) ).toEqual( 'Hello' );
		headers.set( 'X-Custom-Header', 'Bye' );
		expect( headers.get( 'X-Custom-Header' ) ).toEqual( 'Bye' );
	} );
	describe( 'with custom headers', () => {
		test( 'allows to get Authorization header with custom names', () => {
			const headers = new ApiHeaders();
			headers.authorization = 'Hi!';
			expect( headers.get( 'aUtHoRizatIon' ) ).toEqual( 'Hi!' );
			expect( headers.get( 'authorIZAtiOn' ) ).toEqual( 'Hi!' );
		} );
		test( 'allows to get Accept header with custom names', () => {
			const headers = new ApiHeaders();
			headers.accept = 'Hi!';
			expect( headers.get( 'AccEpT' ) ).toEqual( 'Hi!' );
			expect( headers.get( 'aCCePt' ) ).toEqual( 'Hi!' );
		} );
		test( 'allows to get Content-Type header with custom names', () => {
			const headers = new ApiHeaders();
			headers.contentType = 'Hi!';
			expect( headers.get( 'content-TYPE' ) ).toEqual( 'Hi!' );
			expect( headers.get( 'cONtENt-tyPe' ) ).toEqual( 'Hi!' );
		} );
		test( 'allows to set Content-Type header with custom names', () => {
			const headers = new ApiHeaders();
			headers.set( 'cOnTent-TYPe', 'my-content/type' );
			expect( headers.contentType ).toEqual( 'my-content/type' );
			headers.set( 'conTENt-typE', 'my-content/type2' );
			expect( headers.contentType ).toEqual( 'my-content/type2' );
		} );
		test( 'allows to set Accept header with custom names', () => {
			const headers = new ApiHeaders();
			headers.set( 'aCCEpt', 'my-content/type' );
			expect( headers.accept ).toEqual( 'my-content/type' );
			headers.set( 'acCePT', 'my-content/type2' );
			expect( headers.accept ).toEqual( 'my-content/type2' );
		} );
		test( 'allows to set Authorization header with custom names', () => {
			const headers = new ApiHeaders();
			headers.set( 'auTHOrizAtiOn', 'Token: token1' );
			expect( headers.authorization ).toEqual( 'Token: token1' );
			headers.set( 'AuthoRIZAtion', 'Token: token2' );
			expect( headers.authorization ).toEqual( 'Token: token2' );
		} );
		test( 'only serializes specific names for specific headers', () => {
			const headers = new ApiHeaders();
			headers.set( 'AuThoRIZatiOn', 'Good Bye!' );
			headers.set( 'ConTent-TYPe', 'something/content' );
			headers.set( 'AcCEPt', 'something/different' );
			const serialization = headers.toDictionary();
			const properties = Object.getOwnPropertyNames( serialization );
			expect( properties ).toHaveLength( 3 );
			expect( properties ).toContain( 'Content-Type' );
			expect( properties ).toContain( 'Accept' );
			expect( properties ).toContain( 'Authorization' );
		} );
	} );
	test( 'serializes specific headers and customs', () => {
		const headers = new ApiHeaders();
		headers.contentType = 'text/html';
		headers.authorization = 'Token: Some Token';
		headers.set( 'Cookie', 'session=123456' );
		headers.set( 'X-Custom-Header', 'lala' );
		const serialization = headers.toDictionary();
		expect( serialization.Accept ).toEqual( 'application/json' );
		expect( serialization[ 'Content-Type' ] ).toEqual( 'text/html' );
		expect( serialization.Authorization ).toEqual( 'Token: Some Token' );
		expect( serialization.Cookie ).toEqual( 'session=123456' );
		expect( serialization[ 'X-Custom-Header' ] ).toEqual( 'lala' );
		expect( Object.getOwnPropertyNames( serialization ) ).toHaveLength( 5 );
	} );
	test( 'merges custom headers', () => {
		const headers = new ApiHeaders();
		headers.set( 'X-Custom-Header', 'Hi!' );
		headers.set( 'x-cUsTom-heADeR', 'Bye :-(' );
		headers.set( 'x-cusTom2-header', 'Hi!' );
		headers.set( 'X-cUsTom2-heADeR', 'Oh noes! :O' );
		const serialized = headers.toDictionary();
		expect( Object.getOwnPropertyNames( serialized ) ).toHaveLength( 4 );
		expect( serialized[ 'X-Custom-Header' ] ).toEqual( 'Bye :-(' );
		expect( serialized[ 'x-cusTom2-header' ] ).toEqual( 'Oh noes! :O' );
	} );
} );
