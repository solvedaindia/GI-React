import React from 'react';
import { Link } from 'react-router-dom';
import {imagePrefix} from '../../../public/constants/constants';
import '../../../public/styles/clpContainer/themeData.scss';
class ThemeData extends React.Component {
	constructor(props) {
		super(props);
    }
    render(){
        const { itemDetail } = this.props;
        const [{ x, y }] = itemDetail.coords;
        var productname = String(itemDetail.productName).toLowerCase()
        var routePath = `/pdp/furniture-${productname.split(' ').join('-')}/${itemDetail.uniqueID}`
        return(
            <div className='details'
                onClick={this.props.closePopUp}
                style={{top:`${Number(x)+5}%`, left:`${Number(y)+5}%`}}
            >
                <figure className='tnImg'>
                    <img
                        className='img'
                        src={`${imagePrefix}${itemDetail.thumbnail}`}
                        alt='img'
                    />
                </figure>
                <div className='prodDetails'>
                    <h2 className='prodNAme'>{itemDetail.productName}</h2>
                    <p className='price'>₹{itemDetail.offerPrice}</p>
                    <Link to={routePath}><p className='link'>View Details</p></Link>
                </div>
            </div>
        )	
    }
}

export default ThemeData;