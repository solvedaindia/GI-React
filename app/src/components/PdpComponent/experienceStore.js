import React from 'react';
import { Link } from 'react-router-dom';

const experienceStore = props => {
	let storeArray = new Array();
	props.experienceStore.map((data, index) => {
		storeArray.push(data.storeId);
	});
	
	return(
  	<>
		{props.experienceStore.length > 0 &&
			<div className="ExperienceProduct">
				Experience this product at{' '}
				<Link to={{ pathname: '/storelocator', state: { storeId: [props.experienceStore[0].storeId] } }} className="bold" role="button">
					{props.experienceStore[0].name} ({props.experienceStore[0].distanceFromShipToAddress} K.M away)
                </Link>
				{ props.experienceStore.length > 1 &&
					<>
						{' '}and <Link to={{ pathname: '/storelocator', state: { storeId: storeArray } }} className="bold" role="button">
							{props.experienceStore.length-1} More {props.storeText}
                		</Link>
					</>
				}
			</div>
		}
  	</>
	)};
export default experienceStore;
