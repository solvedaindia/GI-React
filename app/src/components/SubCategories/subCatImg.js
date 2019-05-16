import React from 'react';

const SubCatImg = (props) => {
    return (
        <div className='subCatImg'>
            {props.subCategoryArray.map((subCatImg, index) => {
                return (
                    <img key={`subCatImg-${index}`} src={subCatImg.fullImage} className='catImg' alt='category Image'/>
                )
            })}
        </div>

    );
}

export default SubCatImg;
