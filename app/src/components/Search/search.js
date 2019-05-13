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
        if(this.state.searchData.length > 0) {
            if (this.node.contains(e.target)) {
                return;
            }
            this.setState({
                searchData: []
            });
        }
    }

    render() {
        const searchData = this.state.searchData;
        return (
            <div className='searchBar'>
                <SearchLogo />                
                <input className='searchInput' id='searchInput' onChange={this.handleChange} onClick={this.handleChange} type='text' autoComplete='off' placeholder='search for products' />
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