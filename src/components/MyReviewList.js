import React, { Fragment } from 'react';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MyReviewItem from './MyReviewItem';

const MyReviewList = props => (
  <Fragment>
    {props.myReviews.map(review => (
      <Fragment key={review.time}>
        <Link to={`/companydetail/${review.companyId}`}>
          <MyReviewItem review={review} />
        </Link>
        <Divider />
      </Fragment>
    ))}
  </Fragment>
);

export default MyReviewList;
