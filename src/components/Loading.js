import React from 'react';



const Loading = (props) => {
	return(
		<div className="ui active inverted dimmer">
			<div className="ui text loader massive">{ props.message } &hellip;</div>
		</div>
	)
};



export default Loading;
