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
    currentIndex:-1,
    
  };

  constructor()
  {
    super();
    this.currentMenu=React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event)
  {
      //console.log("MenuTitle",event.target.id);
      if(event.target.id=="menu_title")
      {
        return;
      }
      if(this.currentMenu && this.currentMenu.current.contains(event.target) && this.lastIndex!=-1);
      {
        this.onCloseMenu();
        document.removeEventListener('touchstart', this.handleClickOutside);
        event.preventDefault();
      }
  }
  onTouchAndMouserEvennt(event,index)
  {
    console.log("lastindex",this.lastIndex!=index)
    if(this.lastIndex!=index)
    {
      if(event.type=='touchstart')
      {
          if(event.target.nodeName=='A')
          {
            this.lastIndex = index;
            this.setState({currentIndex:index})
            document.addEventListener('touchstart', this.handleClickOutside);
          }
          else{
            return
          }
      }
      this.lastIndex = index;
      this.setState({currentIndex:index})
     // document.addEventListener('touchstart', this.handleClickOutside);
    
    }

  }
  onMouseOverOverMenu(event, parentId)
  {
      const pNode = document.getElementById(parentId);
      const cNode = event.relatedTarget;
      const flag = this.checkParent(pNode,cNode);
    //  console.log("flag1",flag)
    //  console.log("flag1",cNode)
       if(flag==false && pNode!=cNode)
       {
           this.onCloseMenu()
       }
    

  }

  checkParent(parent, child) { 
    let node = child.parentNode; 
    while (node != null) { 
        if (node == parent) { 
            return true; 
        } 
     node = node.parentNode; 
     } 
   return false; 
 } 
  onCloseMenu(event)
  {
      this.lastIndex =-1;
      this.setState({currentIndex:-1})
  }

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
      <div className="category" >
        <ul className="categoryList" >
          {!!category &&
            category.map((categoryData, index) => (
              <li className='listItems' key={`category-${index}`}
                  id = {categoryData.categoryName+index}
                  onMouseOut = {(event)=>{this.onMouseOverOverMenu(event,categoryData.categoryName+index)}}
               >
                  <a className='action action-menu' href={categoryData.onClickUrl} 
                    onMouseOver = {(event)=>{this.onTouchAndMouserEvennt(event,index)}}
                    onTouchStart = {(event)=>{this.onTouchAndMouserEvennt(event,index)}}
                    id = "menu_title">
                  {categoryData.categoryName}
                </a>
                {!!categoryData.subCategoryArray && <div
                
                  ><SubCategoriesData
                  reference = {this.state.currentIndex==index?this.currentMenu:null}
                  onCloseMenu = {this.onCloseMenu.bind(this)}
                  isOpen = {this.state.currentIndex==index}
                  subCategoryArray={categoryData.subCategoryArray}
                  categoryNamePro={categoryData.categoryIdentifier}
                /></div>}
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
