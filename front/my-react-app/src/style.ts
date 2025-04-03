import styled from "styled-components";

export const RegisterCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  input {
    width: 380px;
    height: 45px;
    background: var(--product-background, #f6f6f6);
    border: none;
    padding: 10px;
  }
  label {
    color: var(--Text-Color, #252525);
    font-size: 13px;
    font-weight: 400;
  }
  button {
    width: 380px;
    height: 45px;
    border: none;
    background: var(--Accent-Color, #5f9999);
    color: white;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    margin-top: 10px;
    &:hover{
        background-color: black;
    }
  }
`;

export const NewProductCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 500px;
  margin-top: 100px;
  button{
    width: 90px;
    height: 38px;
    font-size: 13px;
    border: none;
    border-radius: 25px;
    color: white;
    cursor: pointer;
    font-weight: 500;
    background-color: #496a81;
    &:hover{
        background-color: #5F9999;
    }
  }
`

export const ModalCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input ,select{
    width: 350px;
    height: 40px;
    border: none;
    background-color: #D8E8E5;
    padding: 10px;
  }
  button{
    background-color: #34a0a4;
    border: none;
    width: 350px;
    height: 40px;
    color: white;
    cursor: pointer;
    &:hover{
    background-color: #184e77;
}
  }
`
export const ProductsCon = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
max-width: 800px;
width: 100%;
gap: 50px;
margin: 100px auto; /* Center horizontally */
padding: 20px;

`

export const ProductsWrap = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 30px;

.price-desc{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    p{
        color: #3e5c76;
        font-weight: 500;
    }
    h5{
        color: #936639;
    }
}
button{
    width: 100px;
    height: 30px;
    border: none;
    background-color: #012a4a;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: red;
    }
}
`

