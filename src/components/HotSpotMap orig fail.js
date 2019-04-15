import React from 'react';
import googleMaps from '../api/googleMaps.js';


const HotSpotMap = ({ selHotspots }) => {
	// const map = document.getElementById('map');
	// map.classList.add("ping");
	//
	// // let map;
	// // function initMap() {
	// const initMap = ()=> {
	// 	// const map = new google.maps.Map(document.getElementById('map'), {
	// 	// , {
	// 	// 	center: { lat: -34.397, lng: 150.644 },
	// 	// 	zoom: 8
	// 	// });
	// }


	if (!selHotspots.length) {
		return null;
	}
	else {
		console.log("selHotspots", selHotspots);
		return(
			<div className="hotspot-map" id="map">
				<div className="ui embed">
					map:
					{ HotSpotMap }
				</div>
			</div>
		)
	}
}; // HotSpotMap





export default HotSpotMap;
