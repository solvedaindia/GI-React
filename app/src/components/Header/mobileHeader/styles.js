import styled from 'styled-components';
import { Layout } from 'react-bootstrap';
const { Header } = Layout;

const Wrapper = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  background: white !important;
  box-shadow: 0 2px 2px rgba(0,0,0,.15);
  i {
    padding-top: 23px;  
    font-size: 2em;
    margin-left: 12px;
  }
}
`;

export default Wrapper;