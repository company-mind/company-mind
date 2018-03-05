import React, { Component } from 'react';
import * as firebase from 'firebase';

import CompanyArticleContainer from './CompanyArticleContainer';
import CompanyReviewListContainer from './CompanyReviewListContainer';
import CompanyDetailButtonContainer from './CompanyDetailButtonContainer';
import withAuth from '../hocs/withAuth';

class CompanyDetailContainer extends Component {
  render(){
    const { ...rest } = this.props
    return(
      <div>
        <CompanyArticleContainer { ...rest }/>
        <CompanyDetailButtonContainer { ...rest } />
        <CompanyReviewListContainer { ...rest }/>
      </div>
    )
  }
}

export default withAuth(CompanyDetailContainer);
