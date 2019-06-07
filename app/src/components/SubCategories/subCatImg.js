import React from 'react';
import {
	imagePrefix
  
} from '../../../public/constants/constants';

const SubCatImg = (props) => {
    return (
        <div className='subCatImg'>
            {props.subCategoryArray.map((subCatImg, index) => {
                return (
                    <img key={`subCatImg-${index}`} src={`${imagePrefix}${subCatImg.fullImage}`} className='catImg' alt='category Image'/>
                )
            })}
        </div>

    );
}

export default SubCatImg;
