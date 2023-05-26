import styled from 'styled-components';
import { primary, white } from '../../styles/colorProvider';

export const StyledInput = styled.div`
  display: flex;
  flex-direction: row;
  text-align: flex-start;
  align-items: center;
  background-color: ${white};
  border: none;
  outline: 1px solid ${primary};
  font-size: 15px;
  padding-left: 2%;
  margin-bottom: 2%;
  border-radius: ${(props) => props.radius || '10px'};
  height: ${(props) => props.height || '45px'};
  width: ${(props) => props.width || '350px'};

  input {
    border: none;
    height: 85%;
    width: 80%;
    background: ${white};
    outline: none;
    &&:focus {
      color: #ffc82b;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    height: 90%;
    width: 10%;
    width: ${(props) => (props.icon ? '10%' : '7px')};
    background-color: transparent;
    color: #8b8b8b;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;