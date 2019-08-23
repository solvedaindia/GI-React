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
				Experience this product at your neartest{' '}
				<Link to={{ pathname: '/storelocator', state: { storeId: [props.experienceStore[0].storeId] } }} className="bold" role="button">
					{props.experienceStore[0].name} ,{props.experienceStore[0].distanceFromShipToAddress} km from your current location.
                </Link>
				{ props.experienceStore.length > 1 &&
					<>
						{' '} <Link to={{ pathname: '/storelocator', state: { storeId: storeArray } }} className="bold" role="button">
							{/* {props.experienceStore.length-1}  */}
							Locate More {props.storeText}
                		</Link>
					</>
				}
			</div>
		}
  	</>
	)};
export default experienceStore;
