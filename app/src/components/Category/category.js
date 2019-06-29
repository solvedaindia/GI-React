import React from 'react';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/headerContainer/category.scss';
import SearchBar from '../Search/search';
import HeaderRight from '../HeaderRight/headerRight';
import {
  navigationApi,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import SubCategoriesData from '../SubCategories/subCategories';
import SubCatImg from '../SubCategories/subCatImg';

class Category extends React.Component {
  state = {
    category: null,
    isLoading: true,
    errors: null,
  };

  getHeaderLayer2() {
    apiManager
      .get(navigationApi)
      .then(response => {
        const {data} = response || {};
        this.setState({
          category: data && data.data.categoryArray,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getHeaderLayer2();
  }

  render() {
    const { category = [] } = this.state;
    return (
      <div className="category">
        <ul className="categoryList">
          {!!category &&
            category.map((categoryData, index) => (
              <li className='listItems' key={`category-${index}`}>
                <a className='action' href={categoryData.onClickUrl}>
                  {categoryData.categoryName}
                </a>
                {!!categoryData.subCategoryArray && <SubCategoriesData
                  subCategoryArray={categoryData.subCategoryArray}
                  categoryNamePro={categoryData.categoryIdentifier}
                />}
              </li>
            )
            )}
        </ul>
        <SearchBar />
        <HeaderRight />
      </div>
    );
  }
}

export default Category;
