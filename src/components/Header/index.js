import React from 'react';
import userConfig from '../../../config';

import Container from '../Container';
import HeaderImage from '../HeaderImage';
import Social from '../Social';
import Wrapper from './Wrapper';

function Header({ config }) {
  const { author, description, social } = config;

  return (
    <Container>
      <Wrapper>
        {userConfig.showHeaderImage && (
          <HeaderImage/>
        )}
      </Wrapper>
    </Container> 
  );
}

export default Header;