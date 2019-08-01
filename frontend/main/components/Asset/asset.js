import React from 'react';
import { withRouter } from 'next/router';
import { NoSsr, Typography, Grid } from '@material-ui/core';
import FormContainer from '../../core/FormContainer';

import AssetService from './asset.service';

const service = new AssetService();
const defaultConfig = {
  service
};

class AssetForm extends FormContainer {
  constructor(props, config) {
    Object.assign(defaultConfig, config);
    super(props, defaultConfig);
  }

  componentDidMount() {
    console.log('Form did mount');
    this.load();
  }

  AFTER_LOAD = entity => {
    console.log('AFTER_LOAD', entity);
  };

  AFTER_CREATE = instance => {
    console.log('AFTER_CREATE', instance);
  };

  AFTER_CREATE_AND_CHECKOUT = entity => {
    console.log('AFTER_CREATE_AND_CHECKOUT', entity);
  };

  AFTER_SAVE = entity => {
    console.log('AFTER_SAVE', entity);
    const { dialog } = this.props;
    if (dialog) dialog.close('ok');
  };

  BEFORE_CHECKIN = () => {
    console.log('BEFORE_CHECKIN');
  };

  render() {
    const { dialog } = this.props;
    if (dialog) dialog.onOk = this.onDialogOk;

    const { isLoading, baseEntity } = this.state;

    return (
      <NoSsr>
        <Typography variant='h3' className='' gutterBottom>
          This is the [asset] component.
        </Typography>
      </NoSsr>
    );
  }
}

export default withRouter(AssetForm);
