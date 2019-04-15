import axios from 'axios';


const KEY = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";



export default axios.create({
	baseURL: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap",
});
