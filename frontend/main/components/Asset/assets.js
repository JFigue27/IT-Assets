import React from 'react';
import { withRouter } from 'next/router';
import { NoSsr, Typography, Grid } from '@material-ui/core';
import SearchBox from '../../widgets/Searchbox';
import Pagination from 'react-js-pagination';
import ListContainer from '../../core/ListContainer';

import AssetService from './asset.service';

const service = new AssetService();
const defaultConfig = {
  service
};

class AssetsList extends ListContainer {
  constructor(props, config) {
    Object.assign(defaultConfig, config);
    super(props, defaultConfig);
  }

  componentDidMount() {
    console.log('List did mount');
    this.load();
  }

  AFTER_LOAD = () => {
    console.log('AFTER_LOAD');
  };

  AFTER_CREATE = instance => {
    console.log('AFTER_CREATE', instance);
  };

  AFTER_CREATE_AND_CHECKOUT = entity => {
    console.log('AFTER_CREATE_AND_CHECKOUT', entity);
  };

  AFTER_REMOVE = () => {
    console.log('AFTER_REMOVE');
  };

  ON_OPEN_ITEM = item => {
    console.log('ON_OPEN_ITEM', item);
  };

  render() {
    const { isLoading, baseEntity, baseList } = this.state;

    return (
      <NoSsr>
        <Typography variant='h3' className='' gutterBottom>
          This is the [assets] component.
        </Typography>
      </NoSsr>
    );
  }
}

export default withRouter(AssetsList);
