import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Icon, Segment, Pagination, Button } from 'semantic-ui-react';
import Dock from 'react-dock';

const NewColumn = styled(Grid.Column) `
  padding: 0px !important;
`
const NewRow = styled(Grid.Row) `
  padding: 0px !important;
`

export default class CompanyReviewList extends Component {
  handlePaginationChange = (e, { activePage }) => {
    this.props.onPaginationChange(this.props, activePage)
  }
  handleIsVisibleClick = (reviewId, uid, companyId) => {
    this.props.onReviewButtonClick(reviewId, uid, companyId)
  }
  handlePrevClick = () => {
    this.props.onPrevButtonClick()
  }
  handleDeleteClick = () => {
    this.props.onDeleteButtonClick(this.props)
  }
  render(){
    const { reviewItem, pageNumber, isVisible } = this.props;
    return(
      <Segment>
        {
          reviewItem.map(({ reviewId, author, writer, content, emotion, time, likesForReview, dislikesForReview, uid, companyId }) => (
            <Segment key={reviewId}>
              <Grid columns='equal'>
                <NewRow>
                  <NewColumn>
                    <div>{author}</div>
                    <div>{writer}</div>
                  </NewColumn>
                  <NewColumn textAlign='right'>
                    {emotion}
                  </NewColumn>
                </NewRow>
                <NewRow>
                  <NewColumn textAlign='right'>
                    <div>{time}</div>
                  </NewColumn>
                </NewRow>
                <NewRow>
                  <NewColumn>
                    <div>{content}</div>
                  </NewColumn>
                </NewRow>
                <NewRow>
                  <NewColumn>
                    <span><Icon name='thumbs outline up' size='large' />{likesForReview.length}</span>
                    <span><Icon name='thumbs outline down' size='large' />{dislikesForReview.length}</span>
                  </NewColumn>
                  <NewColumn textAlign='right'>
                    <div><Icon name='warning circle' size='large' onClick={e => this.handleIsVisibleClick(reviewId, uid, companyId)} /></div>
                  </NewColumn>
                </NewRow>
              </Grid>
            </Segment>
          ))
        }
        <Grid>
          <NewRow>
            <NewColumn textAlign='center'>
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
        <Dock position='bottom' isVisible={isVisible} fluid={true}>
            <Button fluid>리뷰 수정하기</Button>
            <Button fluid onClick={this.handleDeleteClick}>리뷰 삭제하기</Button>
            <Button fluid onClick={this.handlePrevClick}>돌아가기</Button>
        </Dock>
      </Segment>
    )
  }
}
