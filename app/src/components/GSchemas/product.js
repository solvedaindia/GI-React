import React from 'react';
import { host, imagePrefix } from '../../../public/constants/constants';
import { createSEOPdpURL } from '../../utils/utilityManager';

const ProductSchema = props => {
  if (props.product) {
    return (
      <div vocab="https://schema.org/" typeof="schema:Product">
        <div property="schema:sku" content={props.product.partNumber} />
        <div property="schema:mpn" content={props.product.partNumber} />
        <div
          property="schema:name"
          content={`${props.product.productName} - ${
            props.product.shortDescription
          }`}
        />
        {props.product.attachments.thumbnailImages.map(
          (thumbnailImage, index) => (
            <div
              rel="schema:image"
              resource={`${imagePrefix}${thumbnailImage.imagePath}`}
              key={`${thumbnailImage.imagePath}_${index}`}
            />
          ),
        )}
        <div
          property="schema:description"
          content={props.product.metaDescription}
        />
        <div rel="schema:brand">
          <div typeof="schema:Brand">
            <div property="schema:name" content="Godrej Interio" />
          </div>
        </div>
        <div rel="schema:offers">
          <div typeof="schema:Offer">
            <div property="schema:price" content={props.product.offerPrice} />
            <div rel="schema:seller">
              <div typeof="schema:Organization">
                <div property="schema:name" content="Godrej Interio" />
              </div>
            </div>
            <div property="schema:priceCurrency" content="INR" />
            <div
              rel="schema:url"
              resource={
                host +
                createSEOPdpURL(
                  props.product.productName,
                  props.product.shortDescription,
                  props.product.partNumber,
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }
  return '';
};

export default ProductSchema;
