import React from 'react';

const SearchLogo = () => {
    return (
        <span className='searchLogo'> 
            <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" fillRule="evenodd" d="M20.844 20.082l-4.375-4.374a7.643 7.643 0 0 0 1.884-5.033C18.353 6.44 14.908 3 10.677 3 6.44 3 3 6.444 3 10.675c0 4.23 3.445 7.675 7.677 7.675 1.924 0 3.684-.71 5.033-1.884l4.376 4.374a.526.526 0 0 0 .759 0 .54.54 0 0 0 0-.758zm-16.558-9.37a6.435 6.435 0 0 1 6.428-6.426 6.435 6.435 0 0 1 6.429 6.426c0 3.542-2.882 6.43-6.429 6.43a6.438 6.438 0 0 1-6.428-6.43z"/>
            </svg>
        </span>
        
    );
}

export default SearchLogo;