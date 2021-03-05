

declare module 'parse-uri' {
	const parseUri : ( str : string, opts ?: any ) => {
		source: any
		protocol: any
		authority: any
		userInfo: any
		user: any
		password: any
		host: any
		port: any
		relative: any
		path: any
		directory: any
		file: any
		query: any
		anchor: any
		queryKey: {
			graphql : any
			network : any
			type    : any
			key     : any
		}
	}
	export default parseUri
}

