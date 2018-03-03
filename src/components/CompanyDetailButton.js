import React, { Component } from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NewColumn = styled(Grid.Column) `
  padding: 0 !important;
`
const MSegment = styled(Segment) `
  margin: 0 !important;
  padding: 0;
  cursor: pointer;
`
const NewLink = styled(Link) `
  color: inherit;
  text-decoration: none;
`
export default class CompanyDetailButton extends Component {
  render() {
    return(
      <NewLink to={`/companydetail`} >
        <MSegment>
          <Grid columns={2}>
            <NewColumn textAlign='center'>
              <Segment>
                <Icon name='pencil' size='large' />리뷰 쓰기
              </Segment>
            </NewColumn>
            <NewColumn textAlign='center'>
              <Segment>
                <Icon name='empty star' size='large' />스크랩 하기
              </Segment>
            </NewColumn>
          </Grid>
        </MSegment>
      </NewLink>
    )
  }
}
