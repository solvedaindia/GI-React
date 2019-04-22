import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

const SubCategoriesData = (props) => {
    return (
        <ul className='subCat'>
            {props.subCategoryArray.map((subCategoryData, index) => {
                
                var routePath = '';
                if (subCategoryData.categoryName === 'Sofas') {
                    console.log('SubCat Data-----',subCategoryData);
                    routePath = '/plp/13506';
                }
                else {
                    routePath = '/plp';
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
