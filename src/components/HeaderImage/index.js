import React from 'react';
import Link from 'gatsby-link';

import Wrapper from './Wrapper';
import imgSrc from '../../laptop_clean.png';

function HeaderImage() {
  return (
    <Wrapper>
        <img src={imgSrc} alt="" />
    </Wrapper>
  );
}

export default HeaderImage;
