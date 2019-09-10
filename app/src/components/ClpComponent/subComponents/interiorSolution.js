import React from 'react';
import {GODREJ_INTERIOR, VARIATION_OF_PASSAGES,FIND_OUT_MORE} from '../../../constants/app/clpConstants';

class InteriorSolution extends React.Component {
    render() {
        return (
            <section className='godrejInterior'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-sm-6'>
                            <div className='godrejInteriontext'>
                                <h4 className='heading'>{GODREJ_INTERIOR}</h4>
                                <p className='paragraph'>{VARIATION_OF_PASSAGES}</p>
                                <button className='btn-bg'>{FIND_OUT_MORE}</button>
                            </div>
                        </div>

                        <div className='col-12 col-md-6 col-sm-6'>
                            <div className='godrejiteriorImgbox'>
                                <img className='img-fullwidth' src={require('../../../../public/images/interior.jpg')} alt='interior' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default InteriorSolution;