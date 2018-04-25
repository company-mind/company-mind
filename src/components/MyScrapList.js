import React, { Fragment } from 'react';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MyScrapItem from './MyScrapItem';

const MyScrapList = props => (
  <Fragment>
    {props.myScraps.map(scrap => (
      <Fragment key={scrap.companyId}>
        <Link to={`/companydetail/${scrap.companyId}`}>
          <MyScrapItem scrap={scrap} />
        </Link>
        <Divider />
      </Fragment>
    ))}
  </Fragment>
);

export default MyScrapList;
