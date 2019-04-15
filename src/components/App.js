import React from 'react';
import SearchBar from './SearchBar';
import nycOpenData from '../api/nycOpenData.js';
import HotSpotMap from './HotSpotMap';


class App extends React.Component{
	state = {
		errorMsg: "",
		welcomeMsg: "",
		loadingMap: true,
		userLatitude: null,
		userLongitude: null,
		center: {
			lat: null,
			lng: null,
		},
		zoom: 15,
		term: null,
		hotspots: [],
		selHotspots: []
	};

	componentDidMount(){
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({
				center: {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
			}),
			(err) => this.setState({ errorMsg: err.message })
		);
	};

	hideLoader = () => {
		console.log("app -> hideLoader called");
		setTimeout(()=> {
			this.setState({
				loadingMap: false
			})
		}, 1500);
	}

	onFormSubmit = async (term) => {
		this.setState({
			noneFoundMsg: "",
			zoom: 15
		});

		const response = await nycOpenData.get(`?zip=${ term }`, {});

		if (!response.data.length){
			this.setState({
				noneFoundMsg: "Uh-oh! We found zero WIFI Hot Spots in the zip code you entered. Are you sure that's a New York City zip code? Please try again.",
				zoom: 15
			});
		}
		else {
			const distances = response.data.map((hotspot) => {
				let lat1 = this.state.userLatitude;
				let lon1 = this.state.userLongitude;
				let lat2 = hotspot.latitude;
				let lon2 = hotspot.longitude;
				let unit = "K";

				if ((lat1 === lat2) && (lon1 === lon2)) { return 0; }
				else {
					var radlat1 = Math.PI * lat1/180;
					var radlat2 = Math.PI * lat2/180;
					var theta = lon1-lon2;
					var radtheta = Math.PI * theta/180;
					var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
					if (dist > 1) { dist = 1; }
					dist = Math.acos(dist);
					dist = dist * 180/Math.PI;
					dist = dist * 60 * 1.1515;
					if (unit === "K") { dist = dist * 1.609344 }
					if (unit === "N") { dist = dist * 0.8684 }
					return {
						id: hotspot.objectid,
						selHotspotLat: hotspot.latitude,
						selHotspotLong: hotspot.longitude,
						distance: dist
					};
				}
			}).sort((a, b) => {
				return a.distance > b.distance ? 1 : -1;
			}).slice(0, 5);

			this.setState({
				term: term,
				selHotspots: distances,
				center: {
					lat: parseFloat(distances[0].selHotspotLat),
					lng: parseFloat(distances[0].selHotspotLong)
				},
				zoom: this.state.zoom+1
			});
		} // else (response.data.length)
	}; // onFormSubmit



	renderContent() {
		if (this.state.errorMsg){
			return(
				<h3 className="geolocation-error">please unblock geolocation &hellip; <span>p</span><span>r</span><span>e</span><span>t</span><span>t</span><span>y</span> please?</h3>
			)
		}
		else {
			return (
				<div className="ui container">
					<SearchBar onFormSubmit={ this.onFormSubmit } />
					<div className="map-wrapper">
						<HotSpotMap
							loadingMap={ this.state.loadingMap }
							hideLoader={ this.hideLoader }
							noneFoundMsg={ this.state.noneFoundMsg }
							selHotspots={ this.state.selHotspots }
							userLatitude={ this.state.userLatitude }
							userLongitude={ this.state.userLongitude }
							center={ this.state.center }
							zoom={ this.state.zoom }
						/>
					</div>
				</div>


			)
		}
	};

	render(){
		return(
			<div className="xyz">{ this.renderContent() }</div>
		)
	}

}; // App



export default App;
