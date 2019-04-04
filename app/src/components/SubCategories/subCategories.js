import React from 'react';

const SubCategoriesData = (props) => {
    return(
        <ul className='subCat'>
            {props.subCategoryArray.map((subCategoryData, index) => {
                return(
                    <li className='subCatList' key={`subCat-${index}`}>
                        <a className='subCatLink' href={subCategoryData.onClickUrl}>
                            {subCategoryData.categoryName}
                        </a>
                    </li>
                )
            }
            )}
        </ul>
    );
}

export default SubCategoriesData;
