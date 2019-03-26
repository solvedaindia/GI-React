import React from 'react';

class Price extends React.Component {

    render() {
        return (
            <p className='price paragraph'>Rs {this.props.offerPrice} <span className='priceno-discount'>{this.props.actualPrice}</span> <span className='offerpercent'>(30%
                off)</span></p>
        );
    }
}

export default Price;