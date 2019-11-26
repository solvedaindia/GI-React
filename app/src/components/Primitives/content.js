import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  roomsEspotName
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';
import '../../../public/styles/homePageStatic.scss';
import { withRouter } from 'react-router-dom';
import {isMobile, getCookie } from '../../utils/utilityManager';
import {HELLO_START,HELLO_GUEST, EXPLORE_ROOMS} from '../../constants/app/primitivesConstants';

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
    this.itemClickHandler = this.onItemClick.bind(this);
  }

  onItemClick(e)
  {
    
    
    // if(e.target.nodeName=="IMG" || e.target.nodeName=="H2")
    if(e.target.parentElement.nodeName=="A" || e.target.parentElement.nodeName=="a" )
    {
      //console.log("target",e.target.nodeName);
      
      //console.log("target P",e.target.parentElement.nodeName);
     // alert(e.target.parentElement.attributes.getNamedItem('url').value)
     //console.log("target l",this.props.history);
     const path = e.target.parentElement.attributes.getNamedItem('url').value;
     if(path)
     {
       if(path.search("http")!=-1)
       {
          window.open(path,'_self')
       }
       else{
          this.props.history.push({ pathname: path})   
       }
     }
     
    }

  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {};
        //console.log("Ali Ahmad,",data.data.content.split('<a').join('<a onClick="'+this.onItemClick.bind()+'"').split('href').join('url'));
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
					{HELLO_START}
					</h2>
          <h2 className="title">{pageLayoutEspot.title}</h2></>
				}
				{(this.state.espotName === roomsEspotName) && 
					(getCookie('isLoggedIn') !== 'true') ? 
					<div className='exploreGuest' onClick={(e)=>this.onItemClick(e)} >
						{!isMobile() && <div className='greeting'>
							<p className='greetingHead'>{HELLO_GUEST}</p>
							<p  className='msg'>{EXPLORE_ROOMS}</p>
						</div>}
						<div  className='exploreSection' dangerouslySetInnerHTML={{ __html:this.props.espotName === 'GI_Homepage_Godrej_Solution'? pageLayoutEspot.content  :pageLayoutEspot.content.split('href').join('url') }} />
					</div>
					:
					<>
					<h2 className="title">{pageLayoutEspot.title}</h2>
          <div onClick={(e)=>this.onItemClick(e)}>
          <div dangerouslySetInnerHTML={{ __html: this.props.espotName === 'GI_Homepage_Godrej_Solution'? pageLayoutEspot.content  :pageLayoutEspot.content.split('href').join('url')}} />
          </div>
				
					</>
        		}
			</div>
		)
    );
  }
}

export default withRouter(EspotContent);
