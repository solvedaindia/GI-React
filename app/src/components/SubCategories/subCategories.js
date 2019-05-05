import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

const SubCategoriesData = (props) => {
    return (
        <ul className='catNav'>
            {props.subCategoryArray.map((subCategoryData, index) => {
                var routePath = '';
                if (subCategoryData.categoryName === 'Tables') {
                    routePath = '/plp/12540';
                }
                else if (subCategoryData.categoryName === 'Sofas') {
                    routePath = '/plp/13502';
                }
                else {
                    routePath = '/plp/13506';
                }
                return (
                    <li className='subCatList' key={`subCat-${index}`}>
                    <Link to={routePath}>
                        {/* <a href={subCategoryData.onClickUrl}> */}
                            {subCategoryData.categoryName}
                        {/* </a> */}
                        {/* <div className='subCatImage'>
                            <img src='https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/solution-banner.png' className='subCatImg' alt='Sub Cat Img' />
                        </div> */}
                        </Link>
                    </li>
                )
            })}
        </ul>

    );
}

export default SubCategoriesData;
