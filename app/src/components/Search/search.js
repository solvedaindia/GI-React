import React from 'react';
import apiManager from '../../utils/apiManager';
import SearchLogo from "../SVGs/search";
import {
  autoSuggestAPI
} from '../../../public/constants/constants';
import '../../../public/styles/headerContainer/search.scss';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchData: [],
    }
    this.handleClick = this.handleChange.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.clearFields= this.clearFields.bind(this);
    this.showButton= this.showButton.bind(this);
  }

  handleChange = event => {
    const searchText = event.target.value;
    if (event.target.value === '') {            
      var crossbtn=document.getElementById('clearField');
      crossbtn.style.display='none';
  }
    this.setState({
      searchData: [],
    });

    if (searchText.length > 1) {
      if (searchText) {
        apiManager.get(autoSuggestAPI + searchText).then(response => {
          document.addEventListener('click', this.handleOutsideClick, false);
          this.setState({
            searchData: response.data.data.suggestionView[0].entry,
          });
        }).catch(error => {
          console.log(error.message);
        });
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  };

  handleOutsideClick(e) {
    if (this.state.searchData.length > 0) {
      if (this.node.contains(e.target)) {
        return;
      }
      this.setState({
        searchData: [],
      });
    }
  }

  clearFields(e){         
    var inputVal= document.getElementById("searchInput").value='';     
    var crossbtn = document.getElementById('clearField');
    crossbtn.style.display='none' 
}
showButton(e){ 
  var crossbtn = document.getElementById('clearField');
  crossbtn.style.display='block'
}
  
  render() {
    const searchData = this.state.searchData;
    return (
        <div className='searchBar'>
            <SearchLogo />                
            <input className='searchInput' id='searchInput' onKeyPress={this.showButton} onChange={this.handleChange} onClick={this.handleChange} type='text' autoComplete='off' placeholder='search for products' />
            <a className='clearField' id='clearField' role='button' onClick={this.clearFields}>X</a>
            { searchData.length > 0 && 
                <div id='autoSuggestDiv' ref={node => { this.node = node; }}>
                    <ul className='auto-search'>
                    <li className='list'><a className='link' href='#'>Suggestions</a></li>
                        { searchData.map((item, index) => {    
                            const searchItem = document.getElementById("searchInput").value;
                            if (index < 6) {
                                return(
                                    <li className='list' key={index}><a className='link' href='#'><strong>{ item.term.substr(0, searchItem.length) }</strong>{item.term.substr(searchItem.length)}</a></li>
                                );
                            }
                            })
                        }
                    </ul>
                </div>
            }
        </div>
    );
}

}

export default SearchBar;
