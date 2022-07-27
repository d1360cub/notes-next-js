import React from 'react';
import Navbar from './navbar/Navbar';
import { Container } from 'semantic-ui-react';

const Layout = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <div>
      <Navbar />
      <main style={{background: '#212121'}}>
        <Container style={{paddingTop: '2rem', height: '90vh'}}>
          {children}
        </Container>
      </main>
    </div>
  )
}

export default Layout