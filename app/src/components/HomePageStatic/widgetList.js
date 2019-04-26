import React from 'react';
import Slider from '../Primitives/slider';
import BestSeller from '../BestSelling/bestSelling';
import Recently from '../RecentlyViewed/recentlyViewed';
// import ReadMore from '../../components/GlobalComponents/readMore';
import SubCategory from '../GlobalComponents/subCategory';
export default function WidgetList({ componentType, ...rest }) {
  switch (componentType) {
    case 'hero_banner':
      return <Slider {...rest} />;
    case 'mini_track_order':
      return <p>Mini cart will come</p>;
    case 'best_selling':
      return <BestSeller {...rest} />;
    case 'recently_viewed':
      return <Recently {...rest} />;
    case 'product_category':
      return <SubCategory {...rest} />;
    case 'content':

    case 'recommendation':

    case 'read_more':
    // return (
    //     <ReadMore {...rest} />
    // )
    default:
      return null;
  }
}
