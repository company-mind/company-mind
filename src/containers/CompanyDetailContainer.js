import React, { Component } from 'react';

import CompanyArticleContainer from './CompanyArticleContainer';
import CompanyReviewListContainer from './CompanyReviewListContainer';
import CompanyDetailButtonContainer from './CompanyDetailButtonContainer';
import TopMenuContainer from './TopMenuContainer';
import withAuth from '../hocs/withAuth';

class CompanyDetailContainer extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <div>
        <TopMenuContainer {...rest} />
        <CompanyArticleContainer {...rest} />
        <CompanyDetailButtonContainer {...rest} />
        <CompanyReviewListContainer {...rest} />
      </div>
    );
  }
}

export default withAuth(CompanyDetailContainer);
