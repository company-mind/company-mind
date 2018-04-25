import React, { Fragment } from 'react';
import { Header, Icon, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const MyPageStyledHeader = styled(Header)`
  text-align: center !important;
  margin-left: -10px !important;
`;

const MyIcon = styled(Icon)`
  margin-right: -3px !important;
`;

const MyPageMenu = styled(Menu)`
  display: flex !important;
  justify-content: center !important;
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.2) !important;
`;

const MyPageHeader = props => (
  <Fragment>
    <MyPageStyledHeader>👤{props.nickname}님의 마이페이지</MyPageStyledHeader>
    <MyPageMenu pointing secondary>
      <Menu.Item
        onClick={props.handleReviewButtonClick}
        name="내가 쓴 리뷰🖋"
        active={props.isReviewMode}
        color="blue"
      />
      <Menu.Item
        onClick={props.handleScrapButtonClick}
        name="스크랩한 회사📍"
        active={!props.isReviewMode}
        color="blue"
      />
    </MyPageMenu>
  </Fragment>
);

export default MyPageHeader;
