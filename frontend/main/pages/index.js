import App from '../components/App';
import { Grid, Link } from '@material-ui/core';

export default () => (
  <App>
    <Grid item>
      <Link href='/assets'>
        <img src='/static/images/Molex_Red.png' alt='Logo Molex' style={{ width: 250, paddingTop: '10%' }} />
      </Link>
    </Grid>
  </App>
);
