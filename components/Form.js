import React from "react";
import styled from "styled-components";

import { validateControl } from "../utilities/validation";

class Index extends React.Component {
  constructor(props) {
    super(props);
    const { children, ...form } = props; // will omit children
    this.state = {
      form: {
        ...form,
        isValid: false,
        errors: {}
      }
    };
  }

  handleInput = (key, val) => {
    this.setState(prevState => {
      const newState = validateControl(key, val, prevState);
      return {
        ...prevState,
        ...newState
      };
    });
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      const { form } = this.state;
      const target =
        child.type.target !== "button"
          ? child.type.target
          : child.props.type === "submit"
          ? "submit"
          : "button";

      switch (target) {
        case "input":
          const className =
            child.props.name in form.errors
              ? "error"
              : form.controls[child.props.name].isValid
              ? "valid"
              : "";
          return React.cloneElement(child, {
            ...child.props,
            onChange: e => this.handleInput(child.props.name, e.target.value),
            className
          });
        case "submit":
          return React.cloneElement(child, {
            ...child.props,
            disabled: !form.isValid,
            className: !form.isValid ? "notValid" : ""
          });
        default:
          return child;
      }
    });

    return <Container>{children}</Container>;
  }
}

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
`;

export default Index;
