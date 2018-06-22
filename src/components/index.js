import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from './containers/Grid';
import Main from './containers/Main';
const { window } = global;

export const App = () => {
  return (
    <MuiThemeProvider>
      {
        (window.roleId === 0)
        ? <Main/>
        : <Grid/>
      }
    </MuiThemeProvider>
  );
};
