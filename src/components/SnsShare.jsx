import React from 'react';
import Helmet from 'react-helmet';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import styled from '@emotion/styled';


const Container = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  margin-top: 15px;
  padding: 0;
  list-style: none;
  min-height: 50px;
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.li`
  display: inline-block;
  margin: 0 8px;
  
  &:first-child {
    margin-left: 0;
  }

  & svg:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;


const HatenaLogo = styled.div`
  top: 50%;
  left: 50%;
  color: white;
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 17px;
  font-weight: bold;
`

const SnsShare = ({title, link, twitterUserName}) => (
  <Container>
    <Helmet>
      <script type="text/javascript" src="//b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async" />
      <script type="text/javascript" src="//widgets.getpocket.com/v1/j/btn.js?v=1"  charset="utf-8" async="async" />
    </Helmet>

    <ButtonWrapper>
      <TwitterShareButton additionalProps={{'aria-label': 'share_twitter'}} title={title} via={twitterUserName} url={link}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </ButtonWrapper>

    <ButtonWrapper>
      <div
        role="button"
        className="SocialMediaShareButton"
        onClick={() => {
          window.open(`http://b.hatena.ne.jp/entry/${link}`)
        }}
      >
        <div style={{ width: 32, height: 32, position: 'relative' }}>
          <svg
            viewBox="0 0 64 64"
            width="32"
            height="32"
            className="social-icon social-icon--facebook "
          >
            <g>
              <circle cx="32" cy="32" r="31" fill="#008fde" />
            </g>
          </svg>
          <HatenaLogo>B!</HatenaLogo>
        </div>
      </div>
    </ButtonWrapper>

    <ButtonWrapper>
      <LinkedinShareButton additionalProps={{'aria-label': 'share_linkedin'}}  url={link}>
        <LinkedinIcon title={title} size={32} round />
      </LinkedinShareButton>
    </ButtonWrapper>

    <ButtonWrapper>
      <FacebookShareButton additionalProps={{'aria-label': 'share_facebook'}}  url={link}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </ButtonWrapper>

  </Container>
);

export default SnsShare;
