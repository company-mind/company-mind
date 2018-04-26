import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Icon, Segment, Pagination, Button } from 'semantic-ui-react';
import Dock from 'react-dock';
import * as moment from 'moment';
import 'moment/locale/ko';

const MSegment = styled(Segment)`
  margin: 0px !important;
`;

const MinDiv = styled.div`
  min-height: 35rem;
`;
const NewColumn = styled(Grid.Column)`
  padding: 0px !important;
`;
const NewRow = styled(Grid.Row)`
  padding: 0px !important;
`;
const NameDiv = styled.div`
  padding: 2px;
  font-family: 'Spoqa-Han-Sans-Bold';
  font-size: 1.2rem;
  margin-left: 14px;
`;
const Emoge = styled.div`
  font-size: 40px;
  margin-top: -8px;
  margin-right: 14px;
`;
const DockDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;
const DockButtonButton = styled(Button)`
  cursor: pointer;
  width: 30vh;
  padding: 20px 15px;
`;

export default class CompanyReviewList extends Component {
  static defaultProps = {
    reviewItem: [],
    pageNumber: 1,
    onSubstrangermit: () => {},
    onReviewButtonClick: () => {},
    onPrevButtonClick: () => {},
    onDeleteButtonClick: () => {},
    onlikesForReviewClick: () => {},
    isVisible: false,
    isUserVisible: false,
  };

  handlePaginationChange = (e, { activePage }) => {
    this.props.onPaginationChange(this.props, activePage);
  };

  handleIsVisibleClick = (reviewId, uid, companyId) => {
    this.props.onReviewButtonClick(reviewId, uid, companyId);
  };

  handleUserPrevClick = () => {
    this.props.onUserPrevButtonClick();
  };

  handlePrevClick = () => {
    this.props.onPrevButtonClick();
  };

  handleDeleteClick = () => {
    this.props.onDeleteButtonClick(this.props);
  };

  handlelikesForReviewClick = (reviewId) => {
    this.props.onlikesForReviewClick(reviewId, this.props);
  };

  handleDislikesForReviewClick = (reviewId) => {
    this.props.onDislikesForReviewClick(reviewId, this.props);
  };

  render() {
    const {
      reviewItem, pageNumber, isVisible, isUserVisible,
    } = this.props;
    if (reviewItem.length === 0) {
      return (
        <MSegment textAlign="center">
          <MinDiv>
            <p>리뷰가 없습니다.</p>
            <p>리뷰를 남겨주세요!!!</p>
            <div style={{ fontSize: '30px' }}>😭</div>
          </MinDiv>
        </MSegment>
      );
    }
    return (
      <MSegment>
        <MinDiv>
          {
            reviewItem.map(({
              reviewId,
              author,
              writer,
              content,
              emotion,
              time,
              likesForReview,
              dislikesForReview,
              uid,
              companyId,
            }) => (
              <Segment key={reviewId}>
                <Grid columns="equal">
                  <NewRow style={{ marginTop: '10px', padding: '0' }}>
                    <NewColumn>
                      <NameDiv>{author}</NameDiv>
                      <div style={{ padding: '0px 2px', marginLeft: '14px' }}>{writer}</div>
                    </NewColumn>
                    <NewColumn textAlign="right">
                      <Emoge>{emotion}</Emoge>
                    </NewColumn>
                  </NewRow>
                  <NewRow>
                    <NewColumn>
                      <div style={{ padding: '4px 2px', margin: '5px 0 0 14px', fontSize: '1.1rem' }}>
                        {content}
                      </div>
                    </NewColumn>
                  </NewRow>
                  <NewRow>
                    <NewColumn>
                      <div style={{ paddingRight: '6px', marginLeft: '14px' }}>{moment(time).local('ko').fromNow()}</div>
                    </NewColumn>
                  </NewRow>
                  <Segment style={{ width: '100%', margin: '0', padding: '0 14px' }}>
                    <div
                      onClick={() => this.handlelikesForReviewClick(reviewId)}
                      style={{
                        float: 'left',
                        fontSize: '1.1rem',
                        padding: '5px 5px 5px 0',
                        cursor: 'pointer',
                        }}
                    >
                      <Icon name="thumbs outline up" size="large" />
                      {likesForReview.length}
                    </div>
                    <div
                      onClick={() => this.handleDislikesForReviewClick(reviewId)}
                      style={{
                        float: 'left',
                        marginLeft: '10px',
                        fontSize: '1.1rem',
                        padding: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon name="thumbs outline down" size="large" />
                      {dislikesForReview.length}
                    </div>
                    <div style={{ float: 'right', padding: '5px', cursor: 'pointer' }}>
                      <Icon
                        name="ellipsis horizontal"
                        size="large"
                        onClick={() => this.handleIsVisibleClick(reviewId, uid, companyId)}
                      />
                    </div>
                  </Segment>
                </Grid>
              </Segment>
            ))
          }
        </MinDiv>
        <Grid style={{marginTop: "5px"}}>
          <NewRow>
            <NewColumn textAlign="center">
              <Pagination
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={pageNumber}
                onPageChange={this.handlePaginationChange}
              />
            </NewColumn>
          </NewRow>
        </Grid>
        <Dock position="bottom" isVisible={isUserVisible}>
          <DockDiv>
            <DockButtonButton basic color="black">
              <Icon name="add user" style={{ fontSize: '1.2rem' }} />
              리뷰 수정하기
            </DockButtonButton>
            <DockButtonButton onClick={this.handleDeleteClick} basic color="black">
              <Icon name="remove user" style={{ fontSize: '1.2rem' }} />
              리뷰 삭제하기
            </DockButtonButton>
            <DockButtonButton onClick={this.handleUserPrevClick} color="black">
              <Icon name="log out" style={{ fontSize: '1.2rem' }} />
              돌아가기
            </DockButtonButton>
          </DockDiv>
        </Dock>
        <Dock position="bottom" isVisible={isVisible}>
          <DockDiv>
            <DockButtonButton basic color="black">
              <Icon name="warning circle" style={{ fontSize: '1.2rem' }} />
              신고하기
            </DockButtonButton>
            <DockButtonButton onClick={this.handlePrevClick} color="black">
              <Icon name="log out" style={{ fontSize: '1.2rem' }} />
              돌아가기
            </DockButtonButton>
          </DockDiv>
        </Dock>
      </MSegment>
    );
  }
}
