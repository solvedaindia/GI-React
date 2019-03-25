import React from 'react';

class MarketingTextBanner extends React.Component {
    render() {
        return (
            <>
                {/* Need to remove image from Css and put in JSX */}
                <div className='plp-slider'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                                <div className='explore-range'>
                                    <h3 className='heading'>Explore the range of <br />Table</h3>
                                    <a href='#' className='btn-bg'>Shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default MarketingTextBanner;