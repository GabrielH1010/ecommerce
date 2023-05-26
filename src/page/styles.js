import styled from "styled-components";
import { black, blue, midleGray, red, white } from "../styles/colorProvider";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: ${blue};
  justify-content: center;
  align-items: center;

  .contentArea{
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
  }
`
export const Product = styled.div`
  display: flex;
  width: 21%;
  background-color: ${white};
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  height: 300px;
  -webkit-box-shadow: 5px 5px 15px -5px #000000; 
  box-shadow: 5px 5px 15px -5px #000000;
  padding: 0 25px;
  text-align: justify;

  .delete{
    color: ${red};
    font-weight: 500;
    cursor: pointer;
  }

  .button-container{
    display: flex;
    width: 80px;
    height: 25px;
    text-align: center;
    align-items: center;
    justify-content: space-between;

    span{
      color: ${midleGray};
    }    p{
      color: ${red};
      cursor: pointer;
    }

    button{
      display: flex;
      width: 25px;
      height: 100%;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 3px;
      color: white;
      cursor: pointer;
    }
  }

  h3{
    color: ${black};
    font-size:30px;
    margin: 0;
    font-weight: 500;
    margin: 20px 0 0 0;
  }
  p{
    font-size: 16px;
    color: ${black};
  }
`;

export const ContentArea = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
  flex-wrap: wrap;

  h3{
    color: ${black};
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    color: ${black};
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  label {
    font-weight: bold;
  }

  textarea {
    width: 330px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  textarea {
    resize: vertical;
    font-size: 14px;
    color: ${black};
    font-family: 'Roboto', sans-serif;
    padding-left: 20px;
    margin-left: 7px;
  }
`;
