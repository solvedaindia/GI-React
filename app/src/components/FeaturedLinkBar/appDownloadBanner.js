import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import {INDIAS_HIGHEST, INSTALL} from '../../constants/app/storeDetailsConstants'

const Wrapper = styled.div``;

class AppDownloadBanner extends React.Component {
  render() {
    return (
      <Wrapper className="app-download-banner fixed-toolbar fixed-toolbar--top">
        <div className="app-download-banner__star-rating" data-reactid="5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 161.16 26.06"
            data-reactid="6"
          >
            <path
              d="M94 11.78l-5.23 5L90 23.72a1.93 1.93 0 0 1-.77 1.93 2 2 0 0 1-2.1.16l-6.5-3.3-6.5 3.3a2 2 0 0 1-2.13-.1 2 2 0 0 1-.8-2l1.22-7-5.22-4.82a1.94 1.94 0 0 1-.5-2 2 2 0 0 1 1.58-1.32l7.27-1 3.23-6.34a2 2 0 0 1 1.8-1 2 2 0 0 1 1.8 1l3.22 6.3 7.3 1a2 2 0 0 1 1.6 1.24 2 2 0 0 1-.5 2.06zM27.9 9.72a2 2 0 0 0-1.6-1.35l-7.27-1L15.78 1A2 2 0 0 0 14 0a2 2 0 0 0-1.8 1L9 7.4l-7.27 1A2 2 0 0 0 .1 9.7a2 2 0 0 0 .52 2l5.23 5-1.23 7a1.94 1.94 0 0 0 .8 2 2 2 0 0 0 1.16.36 2 2 0 0 0 .92-.22l6.5-3.3 6.5 3.3a2 2 0 0 0 2.1-.16 2 2 0 0 0 .78-1.98l-1.22-7 5.23-5a2 2 0 0 0 .5-2zm33.3 0a2 2 0 0 0-1.62-1.35l-7.26-1-3.25-6.34a2 2 0 0 0-1.78-1 2 2 0 0 0-1.8 1l-3.3 6.35-7.3 1a2 2 0 0 0-1.6 1.34 2 2 0 0 0 .5 2l5.24 5-1.23 7a1.94 1.94 0 0 0 .8 2 2 2 0 0 0 1.17.36 2 2 0 0 0 .9-.22l6.5-3.3 6.5 3.3a2 2 0 0 0 2.1-.24 2 2 0 0 0 .78-1.9l-1.23-7 5.25-5a2 2 0 0 0 .5-2zm66.57 0a2 2 0 0 0-1.6-1.35l-7.27-1L115.66 1a2 2 0 0 0-1.8-1 2 2 0 0 0-1.78 1l-3.24 6.36-7.26 1A2 2 0 0 0 100 9.72a2 2 0 0 0 .52 2l5.2 5-1.24 7a2 2 0 0 0 .82 1.94 2 2 0 0 0 1.15.36 2 2 0 0 0 .92-.22l6.5-3.3 6.5 3.3a2.06 2.06 0 0 0 2.1-.16 2 2 0 0 0 .78-1.92l-1.25-7 5.23-5a2 2 0 0 0 .54-2zm32.78 2.08l-5.24 5 1.3 7a1.94 1.94 0 0 1-.8 1.93 2.1 2.1 0 0 1-1.2.38 2.2 2.2 0 0 1-.9-.2l-6.5-3.3-6.5 3.3a2 2 0 0 1-2.05-.1 2 2 0 0 1-.8-2l1.23-7-5.2-4.94a2 2 0 0 1-.5-2 2 2 0 0 1 1.6-1.32l7.25-1 3.25-6.34a1.24 1.24 0 0 1 .2-.26 1.9 1.9 0 0 1 1.6-.77 2 2 0 0 1 1.78 1l3.23 6.34 7.26 1a2 2 0 0 1 1.6 1.37 1.94 1.94 0 0 1-.5 2.04zm-1.42-1.4l-8.26-1.15-3.6-7.1.1 18.2 7.17 3.65-1.4-8z"
              data-reactid="7"
            />
          </svg>
        </div>
        <p className="app-download-banner__msg" data-reactid="8">
         { INDIAS_HIGHEST}
        </p>
        <Button type="button" data-reactid="9">
          <a
            href="http://ad.apsalar.com/api/v1/ad?re=0&amp;st=411809221131&amp;h=c201adfdc1cbca6ebf26985d0ed27c123df4341c"
            data-reactid="10"
          >
            {INSTALL}
          </a>
        </Button>
      </Wrapper>
    );
  }
}

export default AppDownloadBanner;
