import React from 'react';
import { host } from '../../../public/constants/constants';
import { createSEOPdpURL } from '../../utils/utilityManager';

const ListingSchema = props => {
  if (props.itemsList && props.itemsList.length !== 0) {
    return (
      <div vocab="https://schema.org/" typeof="schema:ItemList">
        {props.itemsList.map((item, index) => (
          <div
            rel="schema:itemListElement"
            typeof="schema:ListItem"
            key={item.partNumber}
          >
            <div property="schema:position" content={index + 1} />
            <div
              property="schema:name"
              content={`${item.productName} - ${item.shortDescription}`}
            />
            <div
              property="schema:url"
              content={
                host +
                createSEOPdpURL(
                  item.productName,
                  item.shortDescription,
                  item.partNumber,
                )
              }
            />
          </div>
        ))}
      </div>
    );
  }
  return '';
};

export default ListingSchema;

// export function createPlpItemData(plpData) {
//   let plpItem = Array();
//   let productName;
//   let productUrl;
//   plpData.map((data, index) => {
//       if (data.skuList && data.skuList[0] && data.skuList[0].productName) 
//   {
//     productName = data.skuList[0].productName;
//       } 
//   else if(data.productName)
//   {
//     productName = data.productName;
//       }
//   else 
//   {
//     productName = '';
//       }

//       if (data.skuList && data.skuList[0] && data.skuList[0].partNumber) {
//     productUrl = host+createCategoryPlpURL(productName, data.skuList[0].partNumber);
//       } 
//   else if(data.partNumber)
//   {
//     productUrl = host+createCategoryPlpURL(productName, data.partNumber);
//       }
//   else {
//     productUrl = '';
//       }

//       if (index === 0) {
//           plpItem.push({"@type":"ListItem","position":1,"url":productUrl,"name":productName});
//       } else {
//           plpItem.push({"@type":productUrl,"name":productName});
//       }
      
//   });
//   return plpItem;
// }