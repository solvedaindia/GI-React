import React from 'react';

const experienceStore = props => {
	return(
  	<>
		{props.experienceStore.length > 0 &&
			<div className="ExperienceProduct">
				Experience this product at{' '}
				<a href='/' className="bold" role="button">
					{props.experienceStore[0].name} ({props.experienceStore[0].distanceFromShipToAddress} K.M away)
				</a>
				{ props.experienceStore.length > 1 &&
					<>
						{' '}and <a href='/' className="bold" role="button"> {props.experienceStore.length-1} More {props.storeText} </a>
					</>
				}
			</div>
		}
  	</>
	)};
export default experienceStore;
