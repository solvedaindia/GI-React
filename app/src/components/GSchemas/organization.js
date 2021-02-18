import React from 'react';

const OrganizationSchema = () => (
  <div vocab="https://schema.org/" typeof="schema:Organization">
    <div property="schema:url" content="https://www.godrejinterio.com/business/"></div>
    <div property="schema:logo" content="https://www.godrejinterio.com/imagestore/images/godrejInterio/logo-white.svg"></div>
    <div rel="schema:contactPoint">
      <div typeof="schema:ContactPoint">
        <div property="schema:telephone" content="1-800-267-1122"></div>
        <div property="schema:contactType" content="customer service"></div>
      </div>
    </div>
    <div property="schema:sameAs" content="https://www.facebook.com/godrejinterio"></div>
    <div property="schema:sameAs" content="https://twitter.com/godrejinterio4u"></div>
    <div property="schema:sameAs" content="https://www.pinterest.com/godrejinterio"></div>
    <div property="schema:sameAs" content="https://www.youtube.com/user/godrejinterio"></div>
    <div property="schema:sameAs" content="https://www.instagram.com/godrejinterio"></div>
  </div>
);

export default OrganizationSchema;
