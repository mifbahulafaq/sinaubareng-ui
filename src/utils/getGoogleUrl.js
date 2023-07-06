import config from '../config'

export default function getGoogleUrl(from){
	
	const rootUrl = `http://accounts.google.com/o/oauth2/v2/auth`
	const options = {
		redirect_uri: config.oauth_redirect,
		client_id: config.oauth_clientId,
		access_type: 'offline',
		response_type: 'code',
		prompt: 'consent',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		].join(' '),
		state: from 
	}
	
	const qs = new URLSearchParams(options)
	
	return `${rootUrl}?${qs.toString()}`
}