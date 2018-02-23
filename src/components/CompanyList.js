import React, { Component } from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

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

const NewUl = styled.ul`
  list-style: none;
  display: flex;
  padding : 0px;
  margin : 0px;
  margin-left: 4px;
`

const NewLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

export default class CompanyList extends Component {
  static defaultProps = {
    companies: [],
    onMount: () => { },
  }

  state = {
    companies: [],
  }

  loadFunc = () => {
    setTimeout(() => {
      this.props.onHasMore()
      this.setState(prevState => {
        return {
          companies: [...prevState.companies, ...this.props.companies]
        };
      });
    }, 500);
  };

  render() {
    return (
      <Segment>
        <InfiniteScroll loadMore={this.loadFunc}
          hasMore={this.props.hasmore}
          loader={<div className=" loader " ><Icon loading name='spinner' size='large' color='black' />Loading ... </div>}
        >
        {
          this.state.companies.map(({
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
        </InfiniteScroll>
      </Segment>
    )
  }
}
