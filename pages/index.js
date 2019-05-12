import React from "react";
import styled from "styled-components";

import Form from "../components/Form";

class Index extends React.Component {
  render() {
    return (
      <Container>
        <Form
          name="signup"
          controls={{
            email: {
              value: "",
              isValid: false,
              validationRules: {
                isEmail: true
              },
              error: "That is not a valid email address."
            },
            password: {
              value: "",
              isValid: false,
              connectedInput: "confirmPassword",
              validationRules: {
                minLength: 6
              },
              error: "Password must be at least 6 characters."
            },
            confirmPassword: {
              value: "",
              isValid: false,
              validationRules: {
                equalTo: "password"
              },
              error: "Password and confirm do not match."
            }
          }}
        >
          <Input placeholder="Email Address" name="email" type="text" />
          <Input placeholder="Password" name="password" type="password" />
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <Button type="submit">SUBMIT</Button>
        </Form>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  position: relative;
  z-index: 1;
`;

const Input = styled.input`
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border: solid 1px rgba(70, 70, 255, 0.05);
  margin-bottom: 10px;
  border-radius: 50px;
  display: block;
  box-sizing: border-box;

  &:focus {
    padding: 0 9px;
    border: solid 2px rgba(70, 70, 255, 0.5);
  }

  &.error {
    padding: 0 9px;
    border: solid 2px rgba(255, 70, 70, 0.5);
  }

  &.valid {
    padding: 0 9px;
    border: solid 2px rgba(7, 140, 7, 0.5);
  }
`;

const Button = styled.button`
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  background: rgba(70, 70, 255, 0.75);
  border: none;
  outline: none;
  color: #fff;
  margin-bottom: 10px;
  border-radius: 50px;
  display: block;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: rgba(70, 70, 255, 0.6);
  }

  &:disabled {
    background: rgba(70, 70, 255, 0.2);
  }

  &.notValid {
    cursor: not-allowed;
  }
`;

export default Index;
