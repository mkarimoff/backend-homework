import styled from "styled-components";

export const NavCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 20px;
  margin-top: 100px;

  p{
    color: black;
    padding: 7px 10px;
    border-radius: 15px;

    &:hover{
        background-color: black;
        color: white;
    }
  }
  .active-link p{
    background-color: black;
    color: white;
  }
`;
