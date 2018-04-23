import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyArticle from '../components/CompanyArticle';
import { dispatchCompanyArticle } from '../ducks/companyArticle';
import withLoading from '../hocs/withLoading';

const CompanyArticleLoading = withLoading(CompanyArticle);

class CompanyArticleContainer extends Component {
  static defaultProps = {
    onMount: () => {},
    companyItem: [],
  }

  componentDidMount() {
    this.props.onMount(this.props.match.params);
  }

  render() {
    const { onMount, ...rest } = this.props;
    return (
      <CompanyArticleLoading {...rest} />
    );
  }
}

export default connect(
  // mapStateToProps
  state => ({
    companyItem: state.companyArticle.companyItem,
    loading: state.companyArticle.loading,
  }),
  // mapDispatchToProps
  dispatch => ({
    onMount: ({ companyId }) => {
      dispatch(dispatchCompanyArticle({ companyId }));
    },
  }),
)(CompanyArticleContainer);
