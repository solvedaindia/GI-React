import React from 'react';

const MarketingTextBanner = ({ bannerDataPro }) => (
    <div dangerouslySetInnerHTML={{ __html: bannerDataPro }} />
);

export default MarketingTextBanner;