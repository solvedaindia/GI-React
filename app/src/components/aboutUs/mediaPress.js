import React from 'react';
import SearchBar from '../Search/search';
import HeaderRight from '../HeaderRight/headerRight';

import  '../../../public/styles/about-us/aboutUS.scss'



class MediaPress extends React.Component {
  state = {
    category: null,
    isLoading: true,
    errors: null,
  };

 /* getHeaderLayer2() {
    apiManager
      .get(navigationApi)
      .then(response => {
        this.setState({
          category: response.data.data.categoryArray,
          isLoading: false,
        });
        console.log('Category Navigation Data', response.data.data);
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getHeaderLayer2();
  }*/

    render() {
        return (
             <div className="container">
                <h1 className="Header-Copy-2">Media/Press</h1>
                <hr className="hr" />

            <h2 className="Wed-love-to-hear-from-you-Copy ">Latest News</h2>
            <div className="row">
              <div className="col-md-6">
                <img
                  className="michael-d"
                  src={require('../../../public/images/Bailbrook-House.jpg')}
                  alt="Rectangle"
                />
              </div>
            </div>
          </div> 
        );
    }
}  

export default MediaPress;
