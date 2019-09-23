import React from 'react';
import { Link } from 'react-router-dom';
import {imagePrefix} from '../../../public/constants/constants';
import '../../../public/styles/clpContainer/themeData.scss';
import {VIEW_DETAILS } from '../../constants/app/clpConstants';
import {isMobile } from '../../utils/utilityManager';
import {createPdpURL} from '../../utils/utilityManager';

class ThemeData extends React.Component {
	constructor(props) {
        super(props);
        this.state = { 
            width: 0, 
            height: 0,
            thumbItemWidth:0,
            currentLeftCoords:0,
            currentBotCoords:0, 
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        const { itemDetail } = this.props;
        const [{ x, y }] = itemDetail.coords;
        var currentLeftCords = "62";
        var currentBottomCords = "66";
        
        if(isMobile()){
            if(window.screen.width < 767){
                if(62 < Number(y)){
                    this.setState({currentLeftCoords: "0px 0px 0px -211px"});

                if(currentBottomCords < Number(x)){
                        this.setState({currentLeftCoords: "-90px 0px 0px -211px"});      
                    }else{
                        this.setState({currentLeftCoords: "0px 0px 0px -211px"});
                    }
                }else if(44 < Number(y)){
                    this.setState({currentLeftCoords: "15px 0px 0px -40px"});

                }else if(26 > Number(y)){
                    this.setState({currentLeftCoords: "22px 0px 0px -22px"});

                }else{
                    this.setState({currentLeftCoords: "0px 0px 0px 0px"});
                }
            }else{
                if(currentLeftCords < Number(y)){
                    this.setState({currentLeftCoords: "0px 0px 0px -211px"});
                    
                }else{
                    this.setState({currentLeftCoords: "0px 0px 0px 0px"});
                }
            }
        }
      }
      
      componentWillUnmount() {
        if(isMobile()){
            window.removeEventListener('resize', this.updateWindowDimensions);
        }
      }
      
      updateWindowDimensions() {
        if(isMobile()){
            this.setState({ width: window.innerWidth, height: window.innerHeight });
        }
      }


    render(){
        const { itemDetail } = this.props;
        const [{ x, y }] = itemDetail.coords;
        var productname = String(itemDetail.productName).toLowerCase()
        var routePath = createPdpURL(itemDetail.productName, itemDetail.partNumber)
		var widthContainer = $('.content-childTheme').width();
		var heightContainer = $('.content-childTheme').height();
		var clickY = Number(x) * heightContainer /100;
		var clickX = Number(y) * widthContainer /100;
		var leftX=0
		var leftX=clickX+15
		var topY=0
		var topY = clickY+30
		var width = 200
		var height = 110
		if(isMobile())
		{
			if((Number(widthContainer)-clickX) < 200)
			{
				leftX = (Number(widthContainer)  - 200);
			}
			
			if((Number(heightContainer)-clickY) < 120)
			{
				topY = clickY - 120;
			}
			
		}
		else{
			width=250
			height = 120
			if((Number(widthContainer)-clickX) < 300)
			{
				leftX = (Number(widthContainer)  - 300);
			}
			
			if((Number(heightContainer)-clickY) < 160)
			{
				topY = clickY - 130;
			}
		}
		
        return(
            
            <div className='details'
                onClick={this.props.closePopUp}
                style={{top:`${topY}px`, left:`${leftX}px`, width:`${width}px`, height:`${height}px` }}
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
                    <Link to={routePath}><p className='link'>{VIEW_DETAILS}</p></Link>
                </div>
            </div>
        )	
    }
}

export default ThemeData;