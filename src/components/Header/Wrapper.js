import styled from 'styled-components';

const Wrapper = styled.header`
  margin: 0 auto;
  max-width: 650px;
  ${'' /* padding: 0 50px 50px; */}
  height: 100vh;
  -webkit-flex-flow: column wrap;
  -ms-flex-flow: column wrap;
  flex-flow: column wrap;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack:center;
  -webkit-justify-content:center;
  -ms-flex-pack:center;
  justify-content:center;
`;

export default Wrapper;