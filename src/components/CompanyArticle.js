import React, { Component } from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

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
`;
const NewDiv = styled.div`
  padding: 2px;
`;
const NameDiv = styled.div`
  padding: 2px;
  font-family: 'Spoqa-Han-Sans-Bold';
`;
const Emoge = styled.div`
  font-size: 55px;
  text-align: center;
`;

export default class CompanyArticle extends Component {
  static defaultProps = {
    companyItem: {},
    onMount: () => {},
  };
  render() {
    const { companyItem } = this.props;
    return (
      <MSegment key={companyItem.id}>
        <Grid>
          <Grid.Row stretched>
            <NewLColumn width={10}>
              <NameDiv style={{ fontSize: '1.4rem', marginLeft: '10px' }}>
                {companyItem.name}
              </NameDiv>
              <Grid>
                <Grid.Row>
                  <NewLColumn width={7}>
                    <NewDiv>{companyItem.shortAddress}</NewDiv>
                  </NewLColumn>
                  <NewColumn width={7}>
                    <NewDiv>{companyItem.group}</NewDiv>
                  </NewColumn>
                  <NewLColumn width={7}>
                    <NewDiv>
                      <Icon name="pencil" size="large" />
                      {companyItem.reviewScore}
                    </NewDiv>
                  </NewLColumn>
                  <NewColumn width={7}>
                    <NewDiv>
                      <Icon name="empty star" size="large" />
                      {companyItem.scrapScore}
                    </NewDiv>
                  </NewColumn>
                </Grid.Row>
              </Grid>
            </NewLColumn>
            <NewLColumn style={{ marginLeft: '-2px' }} width={3}>
              <Emoge>{companyItem.emotionScore}</Emoge>
            </NewLColumn>
          </Grid.Row>
        </Grid>
      </MSegment>
    );
  }
}
