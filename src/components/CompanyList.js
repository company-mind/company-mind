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
        id, name, group, address, scrapScore, reviewScore, emotionScore,
         }) => (
              <Grid.Row stretched>
                <Grid.Column>
                  <div>{name}</div>
                  <div>{address}</div>
                  <div>{scrapScore}</div>
                </Grid.Column>
                <Grid.Column>
                  <div>{group}</div>
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
