import React from 'react';
import { Link } from 'react-router-dom';
import {imagePrefix} from '../../../public/constants/constants';
import '../../../public/styles/clpContainer/themeData.scss';
class ThemeData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false
        };
        this.handlePopUp = this.handlePopUp.bind(this);
    }

    handlePopUp() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render(){
        const { itemDetail } = this.props;
        const [{ x, y }] = itemDetail.coords;
        const boxStyle = {
            padding : '8px',
            border : '1px solid #fff',
            backgroudColor : '#fff'
        }
        var productname = String(itemDetail.productName).toLowerCase()
        var routePath = `/pdp/furniture-${productname.split(' ').join('-')}/${itemDetail.uniqueID}`
        return(
            <>
            <span
                className='content-icons'
                style={{top:`${x}%`, left:`${y}%`, boxStyle}}
            >
                <img
                    src={`${imagePrefix}${itemDetail.iconOpen}`}
                    alt= 'open-icon'
                    onClick={this.handlePopUp}
                />
            </span>
            {this.state.showPopup ? 
                <div className='details'
                    onClick={this.handlePopUp}
                    style={{top:`${x}%`, left:`20+${y}%`}}
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
                        <p className='price'>{itemDetail.offerPrice}</p>
                        <Link to={routePath}><p className='link'>View Details</p></Link>
                    </div>
                </div>
                : null
            }
            
            </>
        )	
    }
}

export default ThemeData;