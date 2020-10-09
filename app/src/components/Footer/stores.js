import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import appCookie from '../../utils/cookie';
import { isMobile, getWindowWidth } from '../../utils/utilityManager';

class StoreLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          defaultCount: 41
        };
        this.onCityClick = this.onCityClick.bind(this)

    }

    componentDidMount() {      
        // Store Locator List screen 
        if (getWindowWidth() >= 1024 && getWindowWidth() <= 1188)
        {
            this.setState({
               defaultCount: 30
            })
        }    
        
        else if (getWindowWidth() >= 741 && getWindowWidth() <= 1023)
        {
            this.setState({
                defaultCount: 38
             })
        } 

        else if (getWindowWidth() >= 668 && getWindowWidth() <= 740)
        {
            this.setState({
              defaultCount: 35
             })
        } 
        else if (getWindowWidth() >= 605 && getWindowWidth() <= 667)
        {
            this.setState({
              defaultCount: 35
             })
        }
        else if (getWindowWidth() >= 596 && getWindowWidth() <= 604)
        {
            this.setState({
              defaultCount: 30
             })
        } 
        else if (getWindowWidth() >= 579 && getWindowWidth() <= 595)
        {
            this.setState({
              defaultCount: 30
             })
        } 
        
        else if (getWindowWidth() >= 530 && getWindowWidth() <= 578)
        {
            this.setState({
              defaultCount: 20
             })
        } 
        else if (getWindowWidth() >= 450 && getWindowWidth() <= 520)
        {
            this.setState({
              defaultCount: 25
             })
        } 
        else if (getWindowWidth() >= 352 && getWindowWidth() <= 449)
        {
            this.setState({
              defaultCount: 20
             })
        } 
        else if (getWindowWidth() >= 351 && getWindowWidth() <= 399)
        {
            this.setState({
              defaultCount: 20
             })
        }
        else if (getWindowWidth() >= 321 && getWindowWidth() <= 350)
        {
            this.setState({
              defaultCount: 18
             })
        } 
        else if (getWindowWidth() >= 300 && getWindowWidth() <= 320)
        {
            this.setState({
              defaultCount: 15
             })
        } 
    }
    
    onClickMore() {
        this.setState({
            defaultCount: this.props.name.children.length
        })
    }

    onCityClick() {
        window.scrollTo(0,0);
    }

    render() {
        return(
            <Col md={12} sm={12}>
                <div>
                    <h3 className='heading'>
                        {this.props.name.text}
                    </h3>
                    <ul className={`store_area`}>
                        { this.props.name.children && this.props.name.children.length > 0 &&
                            this.props.name.children.map((links, i) => {
                                if(i+1 <= this.state.defaultCount){
                                    return (                
                                        <li className='list' key={i}>
                                            <Link onContextMenu= {()=>appCookie.set('storeName', links.text, 1 * 24 * 60 * 60 * 1000)} onClick={()=>appCookie.set('storeName', links.text, 1 * 24 * 60 * 60 * 1000)} className='link' to={{ pathname: '/storelocator', state: { storeName: links.text } }}>
                                                {links.text}
                                            </Link>
                                           
                                        </li>
                                    )

                                }
                            })
                        }
                        { this.props.name.children && this.props.name.children.length > 0 &&
                         <li className='list moreButton'>
                            <a className='link'>
                                { !isMobile() ? (
                                    <>...More</>
                                ) : (
                                    <>...And More</>
                                )}
                                </a>
                        </li>
                        }
                    </ul>
                </div>
            </Col>
        );
      }
}

export default StoreLinks;