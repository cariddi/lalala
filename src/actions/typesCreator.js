export function createTypes( ...args ) {
	let obj = {};
	Array.prototype.forEach.call( args, ( arg ) => { obj[ arg ] = arg; } );
	return obj;
}
