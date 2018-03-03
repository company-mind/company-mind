import React, { Component } from 'react';

import CompanyArticleContainer from './CompanyArticleContainer';
import CompanyReviewListContainer from './CompanyReviewListContainer';
import CompanyDetailButtonContainer from './CompanyDetailButtonContainer';

export default class CompanyDetailContainer extends Component {
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
