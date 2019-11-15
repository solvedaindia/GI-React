import React from 'react';
import Slider from '../Primitives/slider';
import BestSeller from '../BestSelling/bestSelling';
import Recently from '../RecentlyViewed/recentlyViewed';
import SubCategory from '../GlobalComponents/subCategory';
import Content from '../Primitives/content';
import ReadMore from '../GlobalComponents/readMore';
import Recommendation from '../Recommendation/reco';
import TrackOrder from '../TrackOrder/trackOrder';
import { getCookie } from '../../utils/utilityManager';
import ExStore from '../ExStore/exStore';

export default function WidgetList({ componentType, ...rest }) {
  switch (componentType) {
    case 'hero_banner':
      return <Slider {...rest} />;
    case 'mini_track_order':
      if (getCookie('isLoggedIn') === 'true') {
        return <TrackOrder {...rest} /> ;
      } else return null;
    case 'best_selling':
      return <BestSeller {...rest} />;
    case 'recently_viewed':
      return <Recently {...rest} />;
    case 'product_category':
      return <SubCategory {...rest} />;
    case 'content':
      return <Content {...rest} />;
    case 'experience_store':
      return <ExStore {...rest} />;
    case 'recommendation':
      return <Recommendation {...rest} />;
    case 'read_more':
      return <ReadMore />;
    default:
      return null;
  }
}
