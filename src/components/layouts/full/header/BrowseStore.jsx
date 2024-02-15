import { Badge, IconButton, Tooltip } from '@mui/material';

import React from 'react';
import { useNavigate } from 'react-router';

function BrowseStore() {
  const navigate = useNavigate();
  return (
    <Tooltip title="Browse Stores">
      <IconButton
        onClick={() => navigate('/stores')}
        size="large"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
      >
        {/* <IconBuildingStore size="21" stroke="1.5" /> */}
      </IconButton>
    </Tooltip>
  );
}

export default BrowseStore;
