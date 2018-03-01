import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Icon, Segment, Pagination } from 'semantic-ui-react';

const NewColumn = styled(Grid.Column) `
  padding: 0px !important;
`
const NewRow = styled(Grid.Row) `
  padding: 0px !important;
`

export default class CompanyReviewList extends Component {
  handlePaginationChange = (e, { activePage }) => {
    this.props.onChange(this.props, activePage)
  }
  render(){
    const { reviewItem, page } = this.props;
    return(
      <Segment>
        {
          reviewItem.map(({ reviewId, author, writer, content, emotion, time, likesForReview, dislikesForReview }) => (
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
                    <div><Icon name='warning circle' size='large' /></div>
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
                totalPages={3}
                onPageChange={this.handlePaginationChange}
              />
            </NewColumn>
          </NewRow>
        </Grid>
      </Segment>
    )
  }
}
