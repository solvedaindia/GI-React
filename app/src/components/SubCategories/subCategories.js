import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

class SubCategoriesArray extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subCatImg: null
        };
        this.compLeft = {};
        this.setRef = this.setRef.bind(this);
    }
    
    setRef(ref){
        this.ref=ref;
    }
    handleMouseOver(subCategoryData) {
        this.setState({
            subCatImg: subCategoryData.fullImage
        });
    }
    handleMouseOut() {
        this.setState({
            subCatImg: null
        })
    }
    componentDidMount() {
        const rect = this.ref.getBoundingClientRect();
        this.compLeft = {left: -1*rect.left};
    }
    render() {
        const { subCatImg } = this.state;
        const catClass = this.props.subCategoryArray.length > 6 ? 'catLongList' : 'catList';
        return (
            <div className='catNav' ref={this.setRef} >
                {!!subCatImg && <div className='subCatImage' style={this.compLeft}>
                    <img src={subCatImg} className='subCatImg' alt='Sub Cat Img' />
                </div>}
                
                <ul className={catClass}>
                    {this.props.subCategoryArray.map((subCategoryData, index) => {
                        var routePath = '/plp/'+subCategoryData.uniqueID;
                        // if (subCategoryData.categoryName === 'Tables') {
                        //     routePath = '/plp/12540';
                        // }
                        // else if (subCategoryData.categoryName === 'Sofas') {
                        //     routePath = '/plp/13502';
                        // }
                        // else {
                        //     routePath = '/plp/13506';
                        // }
                        return (
                            <li className='subCatList' key={`subCat-${index}`} onMouseOver={this.handleMouseOver.bind(this, subCategoryData)} onMouseOut={this.handleMouseOut.bind(this)}>
                            <Link to={routePath} className='links'>
                                {/* <a href={subCategoryData.onClickUrl}> */}
                                    {subCategoryData.categoryName}
                                {/* </a> */}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default SubCategoriesArray;
