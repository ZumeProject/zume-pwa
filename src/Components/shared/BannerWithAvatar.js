import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function BannerWithAvatar({ message, buttons = [], avatar }) {
  return (
    <Box clone pt={2} pr={1} pb={1} pl={2} m={1}>
      <Paper elevation={0}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap">
          <Grid item>
            <Box>{avatar}</Box>
          </Grid>
          <Grid item>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-end" spacing={1}>
          {buttons.map((b, i) => (
            <Grid item key={i}>
              {b}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
