import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  roomsEspotName
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';
import '../../../public/styles/homePageStatic.scss';
import {isMobile, getCookie } from '../../utils/utilityManager';
 
// const isLoggedIn = getCookie('isLoggedIn') === 'true';
class EspotContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: this.props.espotName,
      pageLayoutEspot: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {};
        this.setState({
          pageLayoutEspot: data && data.data,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('Homepage Layout Espot Data ERROR');
      });
  }

  componentDidMount() {
    this.getEspotData();
  }

  render() {
    const { pageLayoutEspot, index } = this.state;
    if(!pageLayoutEspot) return null;
    return (
		!!pageLayoutEspot && (

			<div className="espotContent" id={index}>
				{isMobile() && (this.state.espotName === roomsEspotName) && 
					(getCookie('isLoggedIn') !== 'true') && <><h2 className='mwebGreeting'>
						Hello Start Exploring
					</h2>
          <h1 className="title">{pageLayoutEspot.title}</h1></>
				}
				{(this.state.espotName === roomsEspotName) && 
					(getCookie('isLoggedIn') !== 'true') ? 
					<div className='exploreGuest'>
						{!isMobile() && <div className='greeting'>
							<p className='greetingHead'>Welcome</p>
							<p className='msg'>Explore Rooms</p>
						</div>}
						<div className='exploreSection' dangerouslySetInnerHTML={{ __html: pageLayoutEspot.content }} />
					</div>
					:
					<>
					<h1 className="title">{pageLayoutEspot.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: pageLayoutEspot.content }} />
					</>
        		}
			</div>
		)
    );
  }
}

export default EspotContent;
