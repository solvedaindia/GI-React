import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

const SubCategoriesData = (props) => {
    return (
        <ul className='subCat'>
            {props.subCategoryArray.map((subCategoryData, index) => {
                var routePath = '';
                if (subCategoryData.categoryName === 'Tables') {
                    routePath = '/plp/12540';
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
                        </Link>
                    </li>
                )
            }
            )}
        </ul>
    );
}

export default SubCategoriesData;
