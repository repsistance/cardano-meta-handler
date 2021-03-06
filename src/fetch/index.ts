
export const dandelionGQL = ( network : 'testnet' | 'mainnet' ) => (
	( query : string ) => (
		fetch( `https://graphql-api.${network}.dandelion.link/`, {
			method : 'POST',
			body: JSON.stringify( { query : query.trim(), operationName: null, variables: {} } ),
			headers: {
				'content-type' : 'application/json; charset=utf-8'
			}
		} )
		.then( res => res.json() )
		.then( json => json.data )
	)
)
