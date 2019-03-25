import React from 'react';
import axios from 'axios';
import SearchLogo from '../../components/SVGs/search';
import { autoSuggestAPI, storeId, accessToken } from '../../../public/constants/constants';
import '../../../public/styles/headerContainer/search.scss';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            searchData: [],
        }
        this.handleClick = this.handleChange.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    handleChange = (event) => {
        const searchText = event.target.value;
        this.setState({
            searchData: []
        });
        
        if(searchText.length > 1) {
            if (searchText) {
                axios.get(autoSuggestAPI+searchText, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
                    document.addEventListener('click', this.handleOutsideClick, false);
                    this.setState({
                        searchData: response.data.data.suggestionView[0].entry
                    });
                }).catch(error => {
                    console.log(error.message);
                });
            } else {
                document.removeEventListener('click', this.handleOutsideClick, false);
            }
        }
    }

    handleOutsideClick(e) {
        if (this.node.contains(e.target)) {
            return;
        }
        this.setState({
            searchData: []
        });
    }

    render() {
        const searchData = this.state.searchData;
        return (
            <div className='searchBar'>
                <SearchLogo />
                <input className='searchInput' onChange={this.handleChange} onClick={this.handleChange} type='text' placeholder='search for products' />
                <div id='autoSuggestDiv' ref={node => { this.node = node; }}>
                    <ul className='auto-search'>
                        { searchData.map((item, index) => {
                            return(
                                <li className='list' key={index}>{item.term}</li>
                            );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
} 

export default SearchBar;