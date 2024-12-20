import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  flex: 1;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
    transform: scale(0.98);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

export const InfoBlock = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #f9f9f9;
`;