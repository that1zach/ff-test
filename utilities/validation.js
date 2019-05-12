const validate = (val, rules, connectedValue) => {
  // Ensures that multiple validated inputs must stay valid through all checks
  let isValid = true;

  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = isValid && isEmail(val);
        break;

      case "minLength":
        isValid = isValid && minLength(val, rules[rule]);
        break;

      case "equalTo":
        isValid = isValid && equalTo(val, connectedValue[rule]);
        break;

      default:
        isValid = true;
        break;
    }
  }

  return isValid;
};

export const validateControl = (key, value, passedState) => {
  let connectedValue = {};
  let { controls, errors } = passedState.form;

  // All controls without an 'equalTo' validation
  if (!("equalTo" in controls[key])) {
    const isValid = validate(
      value,
      controls[key].validationRules,
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
      controlValue,
      controls[control].validationRules,
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

  const newState = {
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

  return newState;
};

const isEmail = val => {
  /*
	The email validator could also reach out to a domain validation service as a secondary validation
	 */

  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
};

const minLength = (val, minLength) => {
  return val.length >= minLength;
};

const equalTo = (val, checkValue) => {
  return val === checkValue;
};
