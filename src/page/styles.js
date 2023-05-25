import styled from "styled-components";
import { primary } from "../styles/colorProvider";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${primary};
`;

export const Product = styled.div`
  width: 200px;
  background-color: red;
  border-radius: 5px;
  margin-bottom: 10px;
  justify-content: column;
  color: black;
  height: 100%;

  h3{
    color: black;
    font-size:80px;
  }
`;
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 80%;
}

h3 {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 15px 0;
  color: ${primary};
}

p {
  margin-bottom: 25px;
  color: black;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

`;

export const ContentArea = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  text-align: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  label {
    font-weight: bold;
  }

  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    resize: vertical;
  }
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;