import styled from 'styled-components';

export const StyledButton = styled.button`
  left: 50%;
  top: 50%;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;
  position: absolute;

  &:hover {
    background-color: #3e8e41; /* Darker green */
    transform: scale(1.05);
  }
`;