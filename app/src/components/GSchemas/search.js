import React from 'react';

const SearchPageSchema = props => {
  if (props.searchTerm && props.searchTerm !== '') {
    return (
      <div vocab="https://schema.org/" typeof="schema:WebSite">
        <div property="schema:url" content="www.godrejinterio.com" />
        <div rel="schema:potentialAction">
          <div typeof="schema:SearchAction">
            <div
              property="schema:target"
              content={`/search/?keyword={${props.searchTerm}}`}
            />
            <div
              property="schema:query-input"
              content={`required name=${props.searchTerm}`}
            />
          </div>
        </div>
      </div>
    );
  }
  return '';
};

export default SearchPageSchema;
