import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

const SubCategoriesData = (props) => {
    return (
        <ul className='subCat'>
            {props.subCategoryArray.map((subCategoryData, index) => {
                return (
                    
                    <li className='subCatList' key={`subCat-${index}`}>
                    <Link to='/plp'>
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
