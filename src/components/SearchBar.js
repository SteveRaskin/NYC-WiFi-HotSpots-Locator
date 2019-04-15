import React from 'react';


class SearchBar extends React.Component{
	state = { term: "" };

	onInputChange = (e) => {
		this.setState({ term: e.target.value })
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.props.onFormSubmit(this.state.term);
	}

	render(){
		return(
			<div className="ui segment search-bar">
				<form className="ui form" onSubmit={ this.onSubmit }>
					<div className="field">
						<label htmlFor="search-input">
							To find a WIFI Hot Spot in New York City, <span>enter an NYC zip code:</span></label>
						<input
							type="text"
							name="search-input"
							placeholder="enter a New York City zip"
							value={ this.state.term }
							onChange={ this.onInputChange }
						/>
					</div>
				</form>
			</div>
		)
	}
}



export default SearchBar;
