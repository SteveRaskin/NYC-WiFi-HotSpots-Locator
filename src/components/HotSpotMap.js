import React from 'react';
import GoogleMapReact from 'google-map-react';


const Marker = ({ marker }) => <i className="wifi icon"></i>;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};


class HotSpotMap extends React.Component {

	constructor(props){
		super(props);
		this.state = {
		};
	}

	// static defaultProps = {
	// 	center: {
	// 		lat: 59.95,
	// 		lng: 30.33
	// 		// lat: this.props.center.lat,
	// 		// lng: this.props.center.lng
	// 	},
	// 	zoom: 12
	// };

	render() {
		if (this.props.noneFoundMsg) {
			return (
				<div>{ this.props.noneFoundMsg }</div>
			)
		}
		else return (
			// important: set the container height explicitly
			<div className="hotspot-map">
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyAwc3Zcz6uBV0VVvjXEhMthJEkkPeJV9_k" }}
					center={ this.props.center }
					zoom={ this.props.zoom }
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
				>
				{ this.props.selHotspots.map( (hotspot, i) => {
					return (
						<Marker
							key={ i }
							lat={ hotspot.selHotspotLat }
							lng={ hotspot.selHotspotLong }
							marker={`HotSpot ${ i }`}
						/>
					)
				})
				}
				</GoogleMapReact>
			</div>
		);
	}
}; // HotSpotMap


















export default HotSpotMap;
