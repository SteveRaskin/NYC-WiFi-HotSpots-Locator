import axios from 'axios';



const KEY = "vfOYgJJ182M5bjc3q9002wFsa";



export default axios.create({
	baseURL: "https://data.cityofnewyork.us/resource/24t3-xqyv.json",
	data: {
		app_token: KEY
	}
});
