import { Badge, IconButton } from '@mui/material';

import React from 'react';

function Notification() {
  return (
    <IconButton
      size="large"
      aria-label="show 11 new notifications"
      color="inherit"
      aria-controls="msgs-menu"
      aria-haspopup="true"
      sx={{
        ...(typeof anchorEl2 === 'object' && {
          color: 'primary.main',
        }),
      }}
    >
      <Badge variant="dot" color="primary">
        {/* <IconBellRinging size="21" stroke="1.5" /> */}
      </Badge>
    </IconButton>
  );
}

export default Notification;
