import React from 'react';
import { Link } from 'react-router-dom';
import {imagePrefix} from '../../../public/constants/constants';
import '../../../public/styles/clpContainer/themeData.scss';
import ThemeData from './themeData';
import ThemePopUp from './themePopUp';

class ThemeListData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            itemDetail: null,
            index: null
        };
    }

    handlePopUp(itemDetail, index) {
        this.setState({
            itemDetail,
            index
        });
    }

    closePopUp() {
        this.setState({
            itemDetail: null,
            index: null
        })
    }

    componentWillReceiveProps(nextprops){
        this.closePopUp();
    }
    
    render(){
        const { themeItem } = this.props;
        return(
            <>
            {themeItem.recoIconArray.map((itemDetail, index) => {
                return (
                    <ThemeData
                        itemDetail={itemDetail}
                        handlePopUp = {this.handlePopUp.bind(this, itemDetail, index)}
                        closePopUp = {this.closePopUp.bind(this, itemDetail, index)}
                        selectedIndex = {index === this.state.index}
                        key = {`${index}-theme`}
                    />
                )
            })}
            { this.state.itemDetail && 
                <ThemePopUp
                    itemDetail = {this.state.itemDetail}
                    closePopUp = {this.closePopUp}
                />
            }
            </>
        )	
    }
}

export default ThemeListData;