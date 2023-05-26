import styled from 'styled-components';
import { primary, red, white } from '../../styles/colorProvider';

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.outlined ? 'transparent' : primary)};
  border: ${(props) => (props.outlined ? `1px solid ${red}` : 'none')};
  outline: none;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  font-size: ${(props) => props.fontSize || '15px'};
  border-radius: 10px;
  height: ${(props) => props.height || '35px'};
  width: ${(props) => props.width || '180px'};
  color: ${(props) => (props.outlined ? primary : white)};


  &&:hover {
    opacity:${(props) => (props.outlined ? '1' : '0.7')};
    background: ${(props) => (props.outlined ? primary : primary)};
    color: ${(props) => (props.outlined ? white : white)};
;
  }
  &&:disabled {
    opacity: 0.7;
    cursor: default;
    color: ${(props) => (props.outlined ? primary : white)};
  }

  @media (max-width: 850px) {
    width: ${(props) => props.mobileWidth || '100%'};
  }
`;