import React from 'react';
import { Link } from 'react-router-dom';
import {imagePrefix} from '../../../public/constants/constants';
import '../../../public/styles/clpContainer/themeData.scss';
class ThemeData extends React.Component {
	constructor(props) {
		super(props);
    }
    render(){
        const { itemDetail, selectedIndex } = this.props;
        const [{ x, y }] = itemDetail.coords;
        const boxStyle = {
            padding : '8px',
            border : '1px solid #fff',
            backgroudColor : '#fff'
        }
        return(
            <span
                className='content-icons'
                style={{top:`${x}%`, left:`${y}%`, boxStyle}}
            >
                <img
                    src={`${imagePrefix}${!selectedIndex ? itemDetail.iconOpen : '/images/godrejInterio/close.png'}`}
                    alt= {itemDetail.alt}
                    onClick={!selectedIndex ? this.props.handlePopUp : this.props.closePopUp}
                />
            </span>
        )	
    }
}

export default ThemeData;