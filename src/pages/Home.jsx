import { Box, Container } from '@mui/material'
import React from 'react'
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import { Element } from "react-scroll";
import Pricing from '../components/home/Pricing';
import Trade from '../components/home/Trade';
import Support from '../components/home/Support';
import Footer from '../components/home/Footer';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>EA-Trading</title>
      </Helmet>
      <Box minHeight="100vh" bgcolor="#100819">
        <Box
          sx={{
            backgroundImage: "url('/assets/images/gradient.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
            minHeight: "520px",
            overflow: "hidden",
            pt: { md: 5, sm: 2, xs: 2, lg: 5, xl: 5 },
          }}
        >
          <Container>
            <Header />
            <Element name="home" className="section smooth-scroll">
              <Hero />
            </Element>
            <Element name="pricing" className="section smooth-scroll">
              <Pricing />
            </Element>
            <Element name="trading" className="section smooth-scroll">
              <Trade />
            </Element>
            <Element name="support" className="section smooth-scroll">
              <Support />
            </Element>
          </Container>
          <Box mt={5}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
}
