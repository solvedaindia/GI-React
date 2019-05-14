import React from 'react';
const pdpNameDescription = (props) => {
    return (
        <>
            <div className="product">
                <span className='text'>Product ID:</span> 
                <span className='text'>{props.productData.partNumber}</span>
            </div>
            <div className="slimline">
                <h4 className='heading'>
                    {props.productData.productName}
                </h4>
                    {props.productData.shortDescription}<br/>
                <div className='soldbyDealers'>sold by RMZ furniture Dealers</div>
            </div>
        </>    
    );
};

export default pdpNameDescription;
