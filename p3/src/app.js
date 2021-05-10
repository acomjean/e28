import { reactive } from 'vue'


export const axios = require('axios').create({
	baseURL: process.env.VUE_APP_API_URL ?? 'http://e28api.aramcomjean.com',
	responseType: 'json',
	withCredentials: true

})