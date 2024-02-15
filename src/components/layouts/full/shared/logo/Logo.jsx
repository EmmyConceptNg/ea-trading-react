import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from '/public/assets/logo/logo.svg';
import { Box, styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = ({ sx }) => {
  return (
    <LinkStyled sx={{  ...sx, my : 'auto' }} to="/">
      <Box component="img" src="/assets/logo/xpress-logo.png" width="150px" sx={{ my: 'auto' }} />
    </LinkStyled>
  );
};

export default Logo;
