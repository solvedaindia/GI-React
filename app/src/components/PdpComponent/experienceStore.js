import React from 'react';
import { Link } from 'react-router-dom';
import {EXP_THIS_PRODUCT,LOCATE_MORE} from '../../constants/app/pdpConstants';

const experienceStore = props => {
	let storeArray = new Array();
	props.experienceStore.map((data, index) => {
		storeArray.push(data.storeId);
	});
	
	return(
  	<>
		{props.experienceStore.length > 0 &&
			<div className="ExperienceProduct">
				{EXP_THIS_PRODUCT + ' '}
				<Link to={{ pathname: '/storelocator', state: { storeId: [props.experienceStore[0].storeId] } }} className="bold" role="button">
					{props.experienceStore[0].name},{props.experienceStore[0].distanceFromShipToAddress} km from your current location.
                </Link>
				{ props.experienceStore.length > 1 &&
					<>
						{' '} <Link to={{ pathname: '/storelocator', state: { storeId: storeArray } }} className="bold" role="button">
							 {LOCATE_MORE + ' ' +props.storeText}
							 {console.log(LOCATE_MORE+'<<<<store>>>>',props.storeText)}
                		</Link>
					</>
				}
			</div>
		}
  	</>
	)};
export default experienceStore;
