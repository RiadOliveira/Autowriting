import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 200px;
  gap: 12px;

  input,
  button {
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid #000;
  }
`;
