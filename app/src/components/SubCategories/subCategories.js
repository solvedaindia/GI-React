import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

const SubCategoriesData = (props) => {
    return (
        <ul className='subCat'>
            {props.subCategoryArray.map((subCategoryData, index) => {
                return (
                    <li className='subCatList' key={`subCat-${index}`}>
                        <a href={subCategoryData.onClickUrl}>
                            <Link to='/plp'>
                                {subCategoryData.categoryName}
                            </Link>
                        </a>
                    </li>
                )
            }
            )}
        </ul>
    );
}

export default SubCategoriesData;
