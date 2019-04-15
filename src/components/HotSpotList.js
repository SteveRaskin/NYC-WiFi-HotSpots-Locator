import React from 'react';

const HotSpotList = ({ term, selHotspots }) => {

	console.log(selHotspots);

	const showHotSpots = selHotspots.map((selHotspot) => {
		return (
			<p className="hotspot" key={ selHotspot.id }>
				HotSpot #{ selHotspot.id } is <strong>{ selHotspot.distance }</strong> kms from your present location
			</p>
		)
	}); // showHotSpots

	if (!selHotspots.length) {
		return null;
	}
	else {
		return (
			<div className="ui relaxed divided list hotspot-list">
				<p>WIFI Hot Spots nearest to your present location in { term }</p>
				{ showHotSpots }
			</div>
		)
	}
}; // HotSpotList




export default HotSpotList;
