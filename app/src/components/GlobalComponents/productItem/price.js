import React from 'react';

class Price extends React.Component {

    render() {
        return (
            <>
            <span className='discount-price'>₹{this.props.offerPrice}</span>{' '}
            <span className='priceno-discount'>₹{this.props.actualPrice}</span>
            </>
        );
    }
}

export default Price;