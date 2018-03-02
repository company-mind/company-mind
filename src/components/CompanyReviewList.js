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
const NameDiv = styled.div`
  padding : 2px;
  font-family: 'Spoqa-Han-Sans-Bold';
  font-size: 1.2rem;
  margin-left: 14px;
`
const Emoge = styled.div`
  font-Size: 40px;
  margin-top: -8px;
  margin-right: 14px;
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
  handlelikesForReviewClick = (reviewId) => {
    this.props.onlikesForReviewClick(reviewId)
  }
  render(){
    const { reviewItem, pageNumber, isVisible } = this.props;
    return(
      <Segment>
        {
          reviewItem.map(({ reviewId, author, writer, content, emotion, time, likesForReview, dislikesForReview, uid, companyId }) => (
            <Segment key={reviewId}>
              <Grid columns='equal'>
                <NewRow style={{ marginTop: '10px', padding: '0' }}>
                  <NewColumn>
                    <NameDiv>{author}</NameDiv>
                    <div style={{ padding: '0px 2px', marginLeft: '14px' }}>{writer}</div>
                  </NewColumn>
                  <NewColumn textAlign='right'>
                    <Emoge>{emotion}</Emoge>
                  </NewColumn>
                </NewRow>
                <NewRow>
                  <NewColumn>
                    <div style={{ padding: '4px 2px', margin: '5px 0 0 14px', fontSize: '1.1rem' }}>{content}</div>
                  </NewColumn>
                </NewRow>
                <NewRow>
                  <NewColumn>
                    <div style={{ paddingRight: '6px', marginLeft: '14px' }}>{time}</div>
                  </NewColumn>
                </NewRow>
                <Segment style={{ width: '100%', margin: '0', padding: '0 14px'}}>
                  <div onClick={e => this.handlelikesForReviewClick(reviewId)} style={{ float: 'left', fontSize: '1.1rem', padding: '5px 5px 5px 0'}}><Icon name='thumbs outline up' size='large' />{likesForReview.length}</div>
                  <div style={{ float: 'left', marginLeft: '10px', fontSize: '1.1rem', padding: '5px'}}><Icon name='thumbs outline down' size='large' />{dislikesForReview.length}</div>
                  <div style={{ float: 'right', padding: '5px'}}><Icon name='warning circle' size='large' onClick={e => this.handleIsVisibleClick(reviewId, uid, companyId)} /></div>
                </Segment>
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
