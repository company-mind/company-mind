import React, { Component } from 'react';
import { Grid, Icon, Segment, Pagination, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NewColumn = styled(Grid.Column)`
  padding: 0px !important;
  margin-left: 8px;
`;
const NewLColumn = styled(Grid.Column)`
  padding: 0px !important;
  margin-left: 25px;
`;
const MSegment = styled(Segment)`
  margin: 0px !important;
  padding: 10px !important;
  cursor: pointer;
`;
const NewDiv = styled.div`
  padding : 2px;
`;
const NameDiv = styled.div`
  padding : 2px;
  font-family: 'Spoqa-Han-Sans-Bold';
`;
const Emoge = styled.div`
  font-Size: 55px;
  text-Align: center;
`;
const NewLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
const MinDiv = styled.div`
  min-height: 49rem;
`;
const NewRow = styled(Grid.Row)`
  padding: 0px !important;
  margin-top: 10px;
`;

export default class CompanyList extends Component {
  static defaultProps = {
    companies: [],
    onMount: () => { },
  }
  handlePaginationChange = (e, { activePage }) => {
    this.props.onPaginationChange({ activePage });
  }
  handleResultSelect = (e, { result }) => {
    this.props.onResultSelect({ result });
  }
  handleSearchChange = (e, { value }) => {
    this.props.onSearchChange({ value });
  }
  render() {
    const {
      pageItems, pageNumber, searchLoading,
    } = this.props;
    return (
      <div>
        <MinDiv>
          <div style={{ padding: '10px' }}>
            <Input fluid icon='search' placeholder='회사 검색...' onChange={this.handleSearchChange} loading={searchLoading} />
          </div>
          {
          pageItems.map(({
        id, name, group, address, scrapScore, reviewScore, emotionScore, itemProps = {},
         }) => (
           <NewLink to={`/companydetail/${id}`} key={id}>
             <MSegment {...itemProps} >
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
                           <NewDiv><Icon name="pencil" size="large" />{reviewScore}</NewDiv>
                         </NewLColumn>
                         <NewColumn width={7}>
                           <NewDiv><Icon name="empty star" size="large" />{scrapScore}</NewDiv>
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
        </MinDiv>
        <Grid>
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
                style={{ marginTop: "3px" }}
              />
            </NewColumn>
          </NewRow>
        </Grid>
      </div>
    );
  }
}
