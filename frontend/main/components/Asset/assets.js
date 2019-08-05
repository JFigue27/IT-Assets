import React from 'react';
import { withRouter } from 'next/router';
import { NoSsr, Typography, Grid } from '@material-ui/core';
import SearchBox from '../../widgets/Searchbox';
import Pagination from 'react-js-pagination';
import ListContainer from '../../core/ListContainer';
import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import Dialog from '../../widgets/Dialog';
import Asset from './asset.js';
import { AppBar, Toolbar } from '@material-ui/core';

import AssetService from './asset.service';
///start:slot:dependencies<<<///end:slot:dependencies<<<

const service = new AssetService();
const defaultConfig = {
  service
  ///start:slot:config<<<///end:slot:config<<<
};

class AssetsList extends ListContainer {
  constructor(props, config) {
    Object.assign(defaultConfig, config);
    super(props, defaultConfig);
  }

  componentDidMount() {
    console.log('List did mount');
    this.load();

    ///start:slot:didMount<<<///end:slot:didMount<<<
  }

  AFTER_LOAD = () => {
    console.log('AFTER_LOAD');
    ///start:slot:afterLoad<<<///end:slot:afterLoad<<<
  };

  AFTER_CREATE = instance => {
    console.log('AFTER_CREATE', instance);

    ///start:slot:afterCreate<<<
    this.openDialog(instance);
    ///end:slot:afterCreate<<<
  };

  AFTER_CREATE_AND_CHECKOUT = entity => {
    console.log('AFTER_CREATE_AND_CHECKOUT', entity);
    ///start:slot:afterCreateCheckout<<<///end:slot:afterCreateCheckout<<<
  };

  AFTER_REMOVE = () => {
    console.log('AFTER_REMOVE');
    ///start:slot:afterRemove<<<///end:slot:afterRemove<<<
  };

  ON_OPEN_ITEM = item => {
    console.log('ON_OPEN_ITEM', item);

    ///start:slot:onOpenItem<<<
    this.openDialog(item);
    ///end:slot:onOpenItem<<<
  };

  openDialog = item => {
    this.setState({
      asset: item
    });
  };

  closeDialog = feedback => {
    if (feedback == 'ok') {
      this.refresh();
    }
    this.setState({
      asset: false
    });
  };
  ///start:slot:js<<<///end:slot:js<<<

  render() {
    const { isLoading, baseEntity, baseList } = this.state;

    return (
      <NoSsr>
        <Grid className='container-fluid' container direction='column' item xs={12} style={{ padding: 20 }} />
        <Typography variant='h5' className='h5' gutterBottom>
          Assets
        </Typography>
        <Grid container direction='row'>
          <Grid item xs />
          <Pagination
            activePage={this.state.filterOptions.page}
            itemsCountPerPage={this.state.filterOptions.limit}
            totalItemsCount={this.state.filterOptions.totalItems}
            pageRangeDisplayed={5}
            onChange={newPage => {
              this.pageChanged(newPage);
            }}
          />
        </Grid>
        <Table className='' size='small'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>CPU-Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Ram</TableCell>
              <TableCell>CPU</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {baseList &&
              baseList.map(item => (
                <TableRow key={item.Id}>
                  <TableCell>
                    <Grid container direction='row' className='row' justify='center' alignItems='flex-start' spacing={2}>
                      <Grid item xs>
                        <Button
                          variant='contained'
                          color='default'
                          className=''
                          onClick={event => {
                            this.openItem(event, item);
                          }}
                          size='small'
                        >
                          <Icon>edit</Icon>Open
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <InputBase
                      type='text'
                      className=''
                      autoComplete='off'
                      disabled={this.isDisabled}
                      readOnly={true}
                      onChange={event => this.handleInputChange(event, 'CPUName')}
                      value={item.CPUName || ''}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      type='text'
                      className=''
                      autoComplete='off'
                      disabled={this.isDisabled}
                      readOnly={true}
                      onChange={event => this.handleInputChange(event, 'Model')}
                      value={item.Model || ''}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      type='text'
                      className=''
                      autoComplete='off'
                      disabled={this.isDisabled}
                      readOnly={true}
                      onChange={event => this.handleInputChange(event, 'SerialNumber')}
                      value={item.SerialNumber || ''}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      type='text'
                      className=''
                      autoComplete='off'
                      disabled={this.isDisabled}
                      readOnly={true}
                      onChange={event => this.handleInputChange(event, 'Ram')}
                      value={item.Ram || ''}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      type='text'
                      className=''
                      autoComplete='off'
                      disabled={this.isDisabled}
                      readOnly={true}
                      onChange={event => this.handleInputChange(event, 'CPU')}
                      value={item.CPU || ''}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      type='text'
                      className=''
                      autoComplete='off'
                      disabled={this.isDisabled}
                      readOnly={true}
                      onChange={event => this.handleInputChange(event, 'Location')}
                      value={item.Location || ''}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      type='text'
                      className=''
                      autoComplete='off'
                      disabled={this.isDisabled}
                      readOnly={true}
                      onChange={event => this.handleInputChange(event, 'Usuario')}
                      value={item.Usuario || ''}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog open={!!this.state.asset} onClose={this.closeDialog} draggable title='Defect' okLabel='Save'>
          {dialog => {
            return !isLoading && <Asset dialog={dialog} data={this.state.asset} />;
          }}
        </Dialog>
        <AppBar position='fixed' style={{ top: 'auto', bottom: 0 }}>
          <Toolbar variant='dense'>
            <SearchBox bindFilterInput={this.bindFilterInput} value={this.state.filterOptions.filterGeneral} />
            <Grid item xs />
            <Button
              variant='contained'
              color='default'
              className=''
              onClick={event => {
                this.createInstance(event, {});
              }}
            >
              <Icon>add_circle</Icon>New
            </Button>
          </Toolbar>
        </AppBar>
      </NoSsr>
    );
  }
}

export default withRouter(AssetsList);
