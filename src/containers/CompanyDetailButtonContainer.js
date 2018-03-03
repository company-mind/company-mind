import React, { Component } from 'react';
import CompanyDetailButton from '../components/CompanyDetailButton';

export default class CompanyDetailButtonContainer extends Component{
  render() {
    const { ...rest } = this.props;
    return(
      <CompanyDetailButton {...rest} />
    )
  }
}
