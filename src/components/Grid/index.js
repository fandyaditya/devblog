import styled from 'styled-components';

const Grid = styled.section`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;

@media only screen and (max-width: 870px) {
    grid-template-columns: auto auto;
}

@media only screen and (max-width: 600px) {
    grid-template-columns: auto;
  }

`;

export default Grid;