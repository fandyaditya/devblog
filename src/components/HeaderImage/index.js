import React from 'react';
import Link from 'gatsby-link';

import Wrapper from './Wrapper';
import imgSrc from '../../welcome-door.png';

function HeaderImage() {
  return (
    <Wrapper>
        <img src={imgSrc} alt="" />
    </Wrapper>
  );
}

export default HeaderImage;
