import React from 'react';
import Slider from '../Primitives/slider';
import BestSeller from '../BestSelling/bestSelling';
import Recently from '../RecentlyViewed/recentlyViewed';
import SubCategory from '../../components/GlobalComponents/subCategory';
import Content from '../Primitives/content';
import ReadMore from '../GlobalComponents/readMore';
import ExStore from '../ExStore/exStore.js';

export default function WidgetList({ componentType, ...rest }) {
    switch (componentType) {
        case 'hero_banner':
            return (
                <Slider {...rest} />
            );
        case 'mini_track_order':
            return (
                <ExStore {...rest} />
            );
        case 'best_selling':
            return (
                <BestSeller {...rest} />
            );
        case 'recently_viewed':
            return (
                <Recently {...rest} />
            );
        case 'product_category':
            return (
                <SubCategory {...rest} />
            );
        case 'content':
            return (
                <Content {...rest} />
            );
        case 'recommendation':
            return (
                ''
            )
        case 'read_more':
            return (
                <ReadMore />
            )
        default:
        return null;
    }
};
