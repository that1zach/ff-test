import validators from "./validators";

export const validateControl = (key, value, passedState) => {
  let connectedValue = {};
  let { controls, errors } = passedState.form;

  // All controls without an 'equalTo' validation
  if (!("equalTo" in controls[key])) {
    const isValid = validate(
      controls[key].validationRules,
      value,
      connectedValue
    );
    controls = {
      ...controls,
      [key]: {
        ...controls[key],
        value: value,
        isValid
      }
    };

    errors = isValid
      ? delete errors[key]
      : {
          ...errors,
          [key]: controls[key].error
        };
  }

  // All controls with an 'equalTo' validation
  if (
    "connectedInput" in controls[key] ||
    "equalTo" in controls[key].validationRules
  ) {
    //const control = controls[key];

    const control =
      "equalTo" in controls[key].validationRules
        ? key
        : controls[key].connectedInput;

    const equalControl =
      "connectedInput" in controls[key]
        ? key
        : controls[key].validationRules.equalTo;

    const controlValue =
      "equalTo" in controls[key].validationRules
        ? value
        : controls[controls[key].connectedInput].value;

    const equalValue = controls[equalControl].value;

    const connectedValue = {
      ...connectedValue,
      equalTo: equalValue
    };

    const isValid = validate(
      controls[control].validationRules,
      controlValue,
      connectedValue
    );

    controls = {
      ...controls,
      [control]: {
        ...controls[control],
        value: controlValue,
        isValid
      }
    };

    errors = isValid
      ? delete errors[control]
      : {
          ...errors,
          [control]: controls[control].error
        };
  }

  // VALIDATE THE WHOLE FORM
  const isValid = Object.keys(controls).every(c => controls[c].isValid);

  return {
    form: {
      ...passedState.form,
      controls: {
        ...controls
      },
      errors: {
        ...errors
      },
      isValid
    }
  };
};

const validate = (rules, val, connectedValue) => {
  /*
	Ensures that multiple validated inputs must stay valid through all checks
	This switch statement would definitely be trashed with a shorter version in
	its place.
	 */
  let isValid = true;

  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = isValid && validators.isEmail(val);
        break;

      case "minLength":
        isValid = isValid && validators.minLength(val, rules[rule]);
        break;

      case "equalTo":
        isValid = isValid && validators.equalTo(val, connectedValue[rule]);
        break;

      default:
        isValid = true;
        break;
    }
  }

  return isValid;
};
