import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function ZumePersistButton({ onClick, children }) {
  return (
    <Box mb={1}>
      <Button onClick={onClick} variant="outlined" size="small" color="primary">
        {children}
      </Button>
    </Box>
  );
}
