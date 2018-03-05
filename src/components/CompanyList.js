import React, { Component } from 'react';
import { Grid, Icon, Segment, Pagination } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NewColumn = styled(Grid.Column)`
  padding: 0px !important;
  margin-left: 8px;
`
const NewLColumn = styled(Grid.Column)`
  padding: 0px !important;
  margin-left: 25px;
`

const MSegment = styled(Segment)`
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
const NewLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
const NewRow = styled(Grid.Row) `
  padding: 0px !important;
  margin-top: 15px;
`

export default class CompanyList extends Component {
  static defaultProps = {
    companies: [],
    onMount: () => { },
  }
  handlePaginationChange = (e, { activePage }) => {
    this.props.onPaginationChange({activePage})
  }
  render() {
    const { pageItems, pageNumber } = this.props;
    return (
      <Segment>
        {
          pageItems.map(({
        id, name, group, address, scrapScore, reviewScore, emotionScore, itemProps = {},
         }) => (
        <NewLink to={`/companydetail/${id}`} key={id}>
          <MSegment {...itemProps} >
            <Grid>
              <Grid.Row stretched>
                <NewLColumn width={10}>
                  <NameDiv style={{ fontSize: '1.4rem', marginLeft: '10px'}}>{name}</NameDiv>
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
        </NewLink>
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
      </Segment>
    )
  }
}
