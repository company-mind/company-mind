import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class CompanyList extends Component {
  static defaultProps = {
    companies: [],
    onMount: () => { },
  }
  render() {
    const { companies } = this.props;
    return (
      <Grid columns={3}>
        {
          companies.map(({
        id, companyName, companyGroup, companyAddress, scrapScore, reviewScore, emotionScore,
         }) => (
              <Grid.Row stretched>
                <Grid.Column>
                  <div>{companyName}</div>
                  <div>{companyAddress}</div>
                  <div>{scrapScore}</div>
                </Grid.Column>
                <Grid.Column>
                  <div>{companyGroup}</div>
                  <div></div>
                  <div>{reviewScore}</div>
                </Grid.Column>
                <Grid.Column>
                  <div>{emotionScore}</div>
                </Grid.Column>
              </Grid.Row>
         ))
        }
      </Grid>
    )
  }
}
