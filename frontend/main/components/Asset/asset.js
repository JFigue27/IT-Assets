import React from 'react';
import { withRouter } from 'next/router';
import { NoSsr, Typography, Grid, TextField } from '@material-ui/core';
import FormContainer from '../../core/FormContainer';
import { withSnackbar } from 'notistack';

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

    ///start:slot:ctor<<<///end:slot:ctor<<<
  }

  componentDidMount() {
    ///start:slot:load<<<
    this.load(this.props.data.Id);
    ///end:slot:load<<<
  }

  AFTER_LOAD = entity => {
    ///start:slot:afterLoad<<<///end:slot:afterLoad<<<
  };

  AFTER_CREATE = instance => {
    ///start:slot:afterCreate<<<///end:slot:afterCreate<<<
  };

  AFTER_CREATE_AND_CHECKOUT = entity => {
    ///start:slot:afterCreateCheckout<<<///end:slot:afterCreateCheckout<<<
  };

  AFTER_SAVE = entity => {
    const { dialog } = this.props;
    if (dialog) dialog.close('ok');

    ///start:slot:afterSave<<<///end:slot:afterSave<<<
  };

  BEFORE_CHECKIN = async () => {
    ///start:slot:beforeCheckin<<<///end:slot:beforeCheckin<<<
  };

  ///start:slot:js<<<///end:slot:js<<<

  render() {
    const { dialog } = this.props;
    if (dialog) dialog.onOk = this.onDialogOk;

    const { isLoading, isDisabled, baseEntity } = this.state;

    ///start:slot:render<<<///end:slot:render<<<

    return (
      <NoSsr>
        <Grid className='' container direction='column' item xs={12}>
          <TextField
            type='text'
            label='CPU-Name'
            value={baseEntity.CPUName || ''}
            onChange={event => this.handleInputChange(event, 'CPUName')}
            style={{ textAlign: 'left' }}
            margin='dense'
            fullWidth
          />
          <TextField
            type='text'
            label='Model'
            value={baseEntity.Model || ''}
            onChange={event => this.handleInputChange(event, 'Model')}
            style={{ textAlign: 'left' }}
            margin='dense'
            fullWidth
          />
          <TextField
            type='text'
            label='Serial Number'
            value={baseEntity.SerialNumber || ''}
            onChange={event => this.handleInputChange(event, 'SerialNumber')}
            style={{ textAlign: 'left' }}
            margin='dense'
            fullWidth
          />
          <TextField
            type='text'
            label='Ram'
            value={baseEntity.Ram || ''}
            onChange={event => this.handleInputChange(event, 'Ram')}
            style={{ textAlign: 'left' }}
            margin='dense'
            fullWidth
          />
          <TextField
            type='text'
            label='CPU'
            value={baseEntity.CPU || ''}
            onChange={event => this.handleInputChange(event, 'CPU')}
            style={{ textAlign: 'left' }}
            margin='dense'
            fullWidth
          />
          <TextField
            type='text'
            label='Location'
            value={baseEntity.Location || ''}
            onChange={event => this.handleInputChange(event, 'Location')}
            style={{ textAlign: 'left' }}
            margin='dense'
            fullWidth
          />
          <TextField
            type='text'
            label='Usuario'
            value={baseEntity.Usuario || ''}
            onChange={event => this.handleInputChange(event, 'Usuario')}
            style={{ textAlign: 'left' }}
            margin='dense'
            fullWidth
          />
        </Grid>
      </NoSsr>
    );
  }
}

export default withSnackbar(withRouter(AssetForm));
