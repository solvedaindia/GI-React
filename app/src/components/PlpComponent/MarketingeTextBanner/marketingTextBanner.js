import React from 'react';

const dummyData = "<style>.marketing-bannercontent{position:relative;width:100%;height:300px;background:url(https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/marketing_banner.jpg) no-repeat;background-size:cover}.marketing-bannercontent:before{content:'';background:rgba(47,46,48,.1);position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%}.marketing-bannercontent .explore-range{padding:70px 0;margin:0 auto;text-align:center;width:50%}.marketing-bannercontent .explore-range .heading{color:#fff;font-weight:700;padding-bottom:40px}.marketing-bannercontent .headingText .heading{font-weight:700}.btn-white{background:#fff;font-size:14px;font-weight:500;font-style:normal;font-stretch:normal;line-height:normal;letter-spacing:normal;text-align:center;color:#070707;padding:10px 50px}</style><div class=marketing-bannercontent><div class=explore-range><h3 class=heading>10% Off on Table Sets</h3><a class=btn-white href=#>Explore</a></div></div>"
const MarketingTextBanner = ({ bannerDataPro }) => (
    <div dangerouslySetInnerHTML={{ __html: dummyData }} />
);

export default MarketingTextBanner;