import React from 'react';
import { withRouter } from 'next/router';
import { NoSsr, Typography, Grid, TextField } from '@material-ui/core';
import FormContainer from '../../core/FormContainer';
import { InputBase } from '@material-ui/core';

import AssetService from './asset.service';
///start:slot:dependencies<<<///end:slot:dependencies<<<

const service = new AssetService();
const defaultConfig = {
  service
  ///start:slot:config<<<///end:slot:config<<<
};

class AssetForm extends FormContainer {
  constructor(props, config) {
    Object.assign(defaultConfig, config);
    super(props, defaultConfig);
  }

  componentDidMount() {
    console.log('Form did mount');
    this.load(this.props.data.Id);

    ///start:slot:didMount<<<///end:slot:didMount<<<
  }

  AFTER_LOAD = entity => {
    console.log('AFTER_LOAD', entity);
    ///start:slot:afterLoad<<<///end:slot:afterLoad<<<
  };

  AFTER_CREATE = instance => {
    console.log('AFTER_CREATE', instance);

    ///start:slot:afterCreate<<<///end:slot:afterCreate<<<
  };

  AFTER_CREATE_AND_CHECKOUT = entity => {
    console.log('AFTER_CREATE_AND_CHECKOUT', entity);
    ///start:slot:afterCreateCheckout<<<///end:slot:afterCreateCheckout<<<
  };

  AFTER_SAVE = entity => {
    console.log('AFTER_SAVE', entity);
    const { dialog } = this.props;
    if (dialog) dialog.close('ok');
    ///start:slot:afterSave<<<///end:slot:afterSave<<<
  };

  BEFORE_CHECKIN = () => {
    console.log('BEFORE_CHECKIN');
    ///start:slot:beforeCheckin<<<///end:slot:beforeCheckin<<<
  };

  ///start:slot:js<<<///end:slot:js<<<

  render() {
    const { dialog } = this.props;
    if (dialog) dialog.onOk = this.onDialogOk;

    const { isLoading, baseEntity } = this.state;

    return (
      <NoSsr>
        <Grid className='' container direction='column' item xs={12}>
          <TextField
            type='text'
            label='CPU-Name'
            value={baseEntity.CPUName || ''}
            onChange={event => this.handleInputChange(event, 'CPUName')}
            style={{ textAlign: 'left' }}
            margin='normal'
            disabled={this.isDisabled}
            fullWidth
          />
          <TextField
            type='text'
            label='Model'
            value={baseEntity.Model || ''}
            onChange={event => this.handleInputChange(event, 'Model')}
            style={{ textAlign: 'left' }}
            margin='normal'
            disabled={this.isDisabled}
            fullWidth
          />
          <TextField
            type='text'
            label='Serial Number'
            value={baseEntity.SerialNumber || ''}
            onChange={event => this.handleInputChange(event, 'SerialNumber')}
            style={{ textAlign: 'left' }}
            margin='normal'
            disabled={this.isDisabled}
            fullWidth
          />
          <TextField
            type='text'
            label='Ram'
            value={baseEntity.Ram || ''}
            onChange={event => this.handleInputChange(event, 'Ram')}
            style={{ textAlign: 'left' }}
            margin='normal'
            disabled={this.isDisabled}
            fullWidth
          />
          <TextField
            type='text'
            label='CPU'
            value={baseEntity.CPU || ''}
            onChange={event => this.handleInputChange(event, 'CPU')}
            style={{ textAlign: 'left' }}
            margin='normal'
            disabled={this.isDisabled}
            fullWidth
          />
          <TextField
            type='text'
            label='Location'
            value={baseEntity.Location || ''}
            onChange={event => this.handleInputChange(event, 'Location')}
            style={{ textAlign: 'left' }}
            margin='normal'
            disabled={this.isDisabled}
            fullWidth
          />
          <TextField
            type='text'
            label='Usuario'
            value={baseEntity.Usuario || ''}
            onChange={event => this.handleInputChange(event, 'Usuario')}
            style={{ textAlign: 'left' }}
            margin='normal'
            disabled={this.isDisabled}
            fullWidth
          />
        </Grid>
      </NoSsr>
    );
  }
}

export default withRouter(AssetForm);
