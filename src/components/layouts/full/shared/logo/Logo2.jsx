import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { Box, styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo2 = ({ sx }) => {
  return (
    <LinkStyled sx={{ ...sx, my: 'auto' }} to="/">
      <Box
        component="img"
        src="/assets/logo/xpress-logo-single.png"
        width="50px"
        sx={{ my: 'auto' }}
      />
    </LinkStyled>
  );
};

export default Logo2;
