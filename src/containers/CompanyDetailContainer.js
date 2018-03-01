import React, { Component } from 'react';

import CompanyArticleContainer from './CompanyArticleContainer';
import CompanyReviewListContainer from './CompanyReviewListContainer';

export default class CompanyDetailContainer extends Component {
  render(){
    const { ...rest } = this.props
    return(
      <div>
        <CompanyArticleContainer { ...rest }/>
        <CompanyReviewListContainer { ...rest }/>
      </div>
    )
  }
}
