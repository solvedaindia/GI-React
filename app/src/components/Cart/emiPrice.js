import React from 'react';
import { minEMIAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import EMILogo from '../../components/SVGs/emiIcon';
import '../../../public/styles/cart/cartItem.scss';
import {STARTING_FROM_RS } from '../../constants/app/cartConstants';
import {A_MONTH } from '../../constants/app/cartConstants';


class EMIVal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emiVal: null,
            isLoading: false,
            error: null
        }
    }
    getEmiVal(price) {
        apiManager
        .get(`${minEMIAPI}/${price}`)
        .then(response => {
            this.setState({
                emiVal: response.data.data.minEMIValue,
                isLoading: false,
            });
            this.props.getCartDetails();
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
        });
    }
    
    componentWillReceiveProps(nextProps) {
		if(this.props.price !== nextProps.price){
			this.getEmiVal(nextProps.price);
		}
    }
    
    componentDidMount() {
        this.getEmiVal(this.props.price);
    }
    render() {
        const { emiVal } = this.state
        return (
            !!emiVal && 
            <p className='emiMsg'>
                <span className='emiLogo'>
                <EMILogo width={23} height={23} />
                </span>{STARTING_FROM_RS}{emiVal} {A_MONTH }
            </p>
        )
    }
}

export default EMIVal;