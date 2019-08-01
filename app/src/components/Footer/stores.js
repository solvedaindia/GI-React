import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isMobile } from '../../utils/utilityManager';

class StoreLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          defaultCount: 34
        };
    }

    componentDidMount() {
        if (isMobile()) {
            this.setState({
                defaultCount: 23
            })
        }
    }
    
    onClickMore() {
        this.setState({
            defaultCount: this.props.name.children.length
        })
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
                            return (
                                <>
                                { i+1 <= this.state.defaultCount && 
                                <li className='list' key={i}>
                                    <Link className='link' to={{ pathname: '/storelocator', state: { storeName: links.text } }}>
                                        {links.text}
                                    </Link>
                                   
                                </li>
                                }
                                </>
                            )})
                        }
                        { this.props.name.children.length > this.state.defaultCount &&
                         <li className='list moreButton'>
                            <a className='link' onClick={this.onClickMore.bind(this, this.props.name.children.count)}>
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