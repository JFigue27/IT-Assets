import React from 'react';
import { NoSsr, Typography, Grid } from '@material-ui/core';
import SearchBox from '../../widgets/Searchbox';
import Pagination from 'react-js-pagination';
import ListContainer from '../../core/ListContainer';
import { Container } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import Dialog from '../../widgets/Dialog';
import CatalogType from './catalogType.js';
import { AppBar, Toolbar } from '@material-ui/core';

import CatalogTypeService from './catalogtype.service';
///start:slot:dependencies<<<
import Router from 'next/router';
///end:slot:dependencies<<<

const service = new CatalogTypeService();
const defaultConfig = {
  service,
  ///start:slot:config<<<
  filterName: 'FilterCatalogType',
  sortName: 'SortCatalogType'
  ///end:slot:config<<<
};

class CatalogTypesList extends ListContainer {
  constructor(props, config) {
    Object.assign(defaultConfig, config);
    super(props, defaultConfig);
  }

  componentDidMount() {
    console.log('List did mount');
    this.load();
    ///start:slot:load<<<///end:slot:load<<<
  }

  AFTER_LOAD = () => {
    console.log('AFTER_LOAD');
    ///start:slot:afterLoad<<<///end:slot:afterLoad<<<
  };

  AFTER_CREATE = instance => {
    console.log('AFTER_CREATE', instance);

    ///start:slot:afterCreate<<<
    this.openDialog('catalog', instance);
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
    this.openDialog('catalog', item);
    ///end:slot:onOpenItem<<<
  };

  open = item => {
    Router.push(`/catalog?name=${item.Name}`);
  };

  ///start:slot:js<<<///end:slot:js<<<

  render() {
    return (
      <NoSsr>
        <Container style={{ padding: 20 }}>
          <Typography variant='h4' className='h4' gutterBottom>
            Catalogs
          </Typography>
          <Grid container direction='row'>
            <Grid item xs />
            <Pagination
              activePage={this.state.filterOptions.page}
              itemsCountPerPage={this.state.filterOptions.limit}
              totalItemsCount={this.state.filterOptions.itemsCount}
              pageRangeDisplayed={5}
              onChange={newPage => {
                this.pageChanged(newPage);
              }}
            />
          </Grid>
          <Table className='' size='small'>
            <TableHead>
              <TableRow>
                <TableCell width={210} />
                <TableCell width={170}>Name</TableCell>
                <TableCell width={170}>Parent Type</TableCell>
                <TableCell>Fields</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.baseList &&
                this.state.baseList.map(item => (
                  <TableRow key={item.Id}>
                    <TableCell>
                      <Grid container direction='row' className='row' justify='center' alignItems='center' spacing={2}>
                        <Grid item xs>
                          <Button
                            variant='contained'
                            color='default'
                            size='small'
                            onClick={event => {
                              this.openItem(event, item);
                            }}
                          >
                            Definition
                          </Button>
                        </Grid>
                        <Grid item xs>
                          <Button
                            variant='contained'
                            color='default'
                            size='small'
                            onClick={() => {
                              this.open(item);
                            }}
                          >
                            Data
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{item.Name}</TableCell>
                    <TableCell>{item.ParentType}</TableCell>
                    <TableCell>{item.ConvertedFields && item.ConvertedFields.map(e => e.FieldName).join(', ')}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Container>
        <Dialog opener={this} id='catalog' title='Catalog Type' okLabel='Save'>
          {dialog => {
            return !this.state.isLoading && <CatalogType dialog={dialog} data={this.state.catalog} />;
          }}
        </Dialog>
        <AppBar position='fixed' style={{ top: 'auto', bottom: 0 }}>
          <Toolbar variant='dense'>
            <SearchBox
              bindFilterInput={this.bindFilterInput}
              value={this.state.filterOptions.filterGeneral}
              clear={() => this.clearInput('filterGeneral')}
            />
            <Grid item xs />
            <Button
              variant='contained'
              color='default'
              className=''
              onClick={event => {
                this.createInstance({});
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

export default CatalogTypesList;
