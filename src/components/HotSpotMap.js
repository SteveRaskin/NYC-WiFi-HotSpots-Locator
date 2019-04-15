import React from 'react';
import GoogleMapReact from 'google-map-react';
import Loading from './Loading.js'



const Marker = ({ marker }) => <i className="wifi icon"></i>;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};

class HotSpotMap extends React.Component {

	constructor(props){
		super(props);
		this.state = {};
	}


	componentDidMount(){
		this.props.hideLoader();
	};


	renderContent() {
		if (this.props.loadingMap) {
			return(
				<Loading message="loading map with your location" />
			)
		}
		else if (this.props.noneFoundMsg) {
			return (
				<div>{ this.props.noneFoundMsg }</div>
			)
		}
		return(
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
		) // return
	}; // renderContent


	render(){
		return(
			<div className="hotspot-map">{ this.renderContent() }</div>
		)
	};

}; // HotSpotMap



export default HotSpotMap;
