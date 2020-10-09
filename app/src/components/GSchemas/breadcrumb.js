import React from 'react';
import { host } from '../../../public/constants/constants';

const BreadCrumbSchema = props => {
  if (props.breadcrumbs && props.breadcrumbs.length !== 0) {
    return (
      <div vocab="https://schema.org/" typeof="schema:BreadcrumbList">
        {props.breadcrumbs.map((crumb, index) => (
          <div
            rel="schema:itemListElement"
            typeof="schema:ListItem"
            key={crumb.name + '_' + index}
          >
            <div property="schema:position" content={index + 1} />
            <div property="schema:name" content={crumb.name} />
            <div
              property="schema:item"
              content={`${window.location.protocol}//${host}${crumb.url}`}
            />
          </div>
        ))}
      </div>
    );
  }
  return '';
};

export default BreadCrumbSchema;
