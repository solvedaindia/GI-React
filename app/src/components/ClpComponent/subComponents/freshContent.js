import React from 'react';
import {FRESH_CONTENT} from '../../../constants/app/clpConstants';

class FreshContent extends React.Component {
  render() {
    return (
      <section className='freshContent'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='fresh-heading clearfix'>
                <h4 className='heading'>{FRESH_CONTENT}</h4><a className='seeAll' href='javascript:void(0)'>See all</a>
              </div>
            </div>

          </div>
          <div className='row'>
            <div className='col-md-9 col-sm-9'>
              <div className='impactArea'>
                <img className='img-fullwidth' src={require('../../../../public/images/impact.jpg')} alt='Impact' />
              </div>
            </div>

            <div className='col-md-3 col-sm-3'>
              <div className='impact-motivation'>
                <img className='img-fullwidth' src={require('../../../../public/images/impact-motivation.jpg')} alt='Impact Motivation' />
              </div>

              <div className='impact-motivation'>
                <img className='img-fullwidth' src={require('../../../../public/images/impact-motivation.jpg')} alt='Impact Motivation' />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default FreshContent;