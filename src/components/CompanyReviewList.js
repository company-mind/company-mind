import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Icon, Segment, Button } from 'semantic-ui-react';

const NewColumn = styled(Grid.Column) `
  padding: 0px !important;
`
const NewRow = styled(Grid.Row) `
  padding: 0px !important;
`


export default class CompanyReviewList extends Component {
  render(){
    const { reviewItem } = this.props;
    return(
      <Segment>
        {
          reviewItem.map(({ id, nickname, writer, content, emotion, createdAt }) => (
            <Segment key={id}>
              <Grid columns='equal'>
                <NewRow>
                  <NewColumn>
                    <div>{nickname}</div>
                    <div>{writer}</div>
                  </NewColumn>
                  <NewColumn textAlign='right'>
                    {emotion}
                  </NewColumn>
                </NewRow>
                <NewRow>
                  <NewColumn textAlign='right'>
                    <div>{createdAt}</div>
                  </NewColumn>
                </NewRow>
                <NewRow>
                  <NewColumn>
                    <div>{content}</div>
                  </NewColumn>
                </NewRow>
                <NewRow>
                  <NewColumn>
                    <span><Icon name='thumbs outline up' size='large' /></span>
                    <span><Icon name='thumbs outline down' size='large' /></span>
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
              <Button basic color='grey'><Icon name='angle left' size='large' /></Button>
              <Button basic color='grey'><Icon name='angle right' size='large' /></Button>
            </NewColumn>
          </NewRow>
        </Grid>
      </Segment>
    )
  }
}
