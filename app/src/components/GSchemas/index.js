import React from 'react';
import HomePageSchema from './home';
import SearchPageSchema from './search';
import ListingSchema from './listing';
import ProductSchema from './product';
import BreadCrumbSchema from './breadcrumb';

const GSchemas = props => {
  if (props.schemas && props.schemas.length !== 0) {
    return (
      <>
        {props.schemas.map((schema, index) => {
          const key = index;
          switch (schema.type) {
            case 'home':
              return <HomePageSchema key={key} />;
            case 'search':
              return (
                <SearchPageSchema key={key} searchTerm={schema.searchTerm} />
              );
            case 'listing':
              return <ListingSchema key={key} itemsList={schema.itemsList} />;
            case 'product':
              return <ProductSchema key={key} product={schema.product} />;
            case 'breadcrumb':
              return (
                <BreadCrumbSchema
                  key={key}
                  breadcrumbs={schema.breadcrumbItems}
                />
              );
            default:
              return '';
          }
        })}
      </>
    );
  }
  return '';
};

export default GSchemas;
