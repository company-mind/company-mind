import React, { Component } from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const NewColumn = styled(Grid.Column) `
  padding: 0px !important;
  margin-left: 8px;
`
const NewLColumn = styled(Grid.Column) `
  padding: 0px !important;
  margin-left: 25px;
`

const MSegment = styled(Segment) `
  margin: 0px !important;
  cursor: pointer;
`
const NewDiv = styled.div`
  padding : 2px;
`

const NameDiv = styled.div`
  padding : 2px;
  font-family: 'Spoqa-Han-Sans-Bold';
`
const Emoge = styled.div`
  font-Size: 55px;
  text-Align: center;
`

const NewUl = styled.ul`
  list-style: none;
  display: flex;
  padding : 0px;
  margin : 0px;
  margin-left: 4px;
`

export default class CompanyArticle extends Component {
  render(){
    const { id, name, group, address, scrapScore, reviewScore, emotionScore, itemProps = {}, } = this.props
    return (
      <MSegment {...itemProps} key={id} >
        <Grid>
          <Grid.Row stretched>
            <NewLColumn width={10}>
              <NameDiv style={{ fontSize: '1.4rem', marginLeft: '10px' }}>{name}</NameDiv>
              <Grid>
                <Grid.Row>
                  <NewLColumn width={7}>
                    <NewDiv>{address}</NewDiv>
                  </NewLColumn>
                  <NewColumn width={7}>
                    <NewDiv>{group}</NewDiv>
                  </NewColumn>
                  <NewLColumn width={7}>
                    <NewDiv><Icon name='pencil' size='large' />{reviewScore}</NewDiv>
                  </NewLColumn>
                  <NewColumn width={7}>
                    <NewDiv><Icon name='empty star' size='large' />{scrapScore}</NewDiv>
                  </NewColumn>
                </Grid.Row>
              </Grid>
            </NewLColumn>
            <NewLColumn style={{ marginLeft: '-2px' }} width={3}>
              <Emoge>{emotionScore}</Emoge>
            </NewLColumn>
          </Grid.Row>
        </Grid>
      </MSegment>
    )
  }
}
