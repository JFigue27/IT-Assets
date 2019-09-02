import React from 'react';
import { withRouter } from 'next/router';
import { withSnackbar } from 'notistack';
import { NoSsr, Typography, Grid, Container } from '@material-ui/core';
import SearchBox from '../../widgets/Searchbox';
import Pagination from 'react-js-pagination';
import ListContainer from '../../core/ListContainer';

import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import Dialog from '../../widgets/Dialog';
import Asset from './asset.js';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

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
    ///start:slot:ctor<<<///end:slot:ctor<<<
  }

  componentDidMount() {
    ///start:slot:load<<<///end:slot:load<<<
  }

  AFTER_LOAD = baseList => {
    ///start:slot:afterLoad<<<///end:slot:afterLoad<<<
  };

  AFTER_CREATE = instance => {
    ///start:slot:afterCreate<<<
    this.openDialog(instance);
    ///end:slot:afterCreate<<<
  };

  AFTER_CREATE_AND_CHECKOUT = entity => {
    ///start:slot:afterCreateCheckout<<<///end:slot:afterCreateCheckout<<<
  };

  AFTER_REMOVE = () => {
    ///start:slot:afterRemove<<<///end:slot:afterRemove<<<
  };

  ON_OPEN_ITEM = item => {
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
    const { isLoading, baseEntity, baseList, filterOptions } = this.state;

    ///start:slot:render<<<///end:slot:render<<<

    return (
      <NoSsr>
        <Container maxWidth='lg'>
          <Grid className='container-fluid' container direction='column' item xs={12} style={{ padding: 5 }} />
          <Typography variant='h5' className='h5' gutterBottom>
            IT Assets
          </Typography>
          <Grid container direction='row'>
            <Grid item xs />
            <Pagination
              activePage={filterOptions.page}
              itemsCountPerPage={filterOptions.limit}
              totalItemsCount={filterOptions.itemsCount}
              pageRangeDisplayed={5}
              onChange={newPage => {
                this.pageChanged(newPage);
              }}
            />
          </Grid>
          {!isLoading && (
            <Paper style={{ width: '100%', overflowX: 'auto' }}>
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
                          <Grid container direction='row' className='row' justify='center' alignItems='flex-end'>
                            <Grid item xs={12} sm>
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
                          <Typography>{item.CPUName}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.Model}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.SerialNumber}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.Ram}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.CPU}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.Location}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.Usuario}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          )}
          <Dialog open={!!this.state.asset} onClose={this.closeDialog} draggable title='IT Asset' okLabel='Save'>
            {dialog => {
              return !isLoading && <Asset dialog={dialog} data={this.state.asset} />;
            }}
          </Dialog>
          <AppBar position='fixed' style={{ top: 'auto', bottom: 0, background: '#333333' }}>
            <Toolbar variant='dense'>
              <SearchBox bindFilterInput={this.bindFilterInput} value={filterOptions.filterGeneral} />
              <Grid item xs={12} sm />
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
        </Container>
      </NoSsr>
    );
  }
}

export default withSnackbar(withRouter(AssetsList));
