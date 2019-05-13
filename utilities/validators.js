const validators = {
  isEmail: val => {
    return emailRegex.test(val);
  },

  minLength: ({ length }, minLength) => {
    return length >= minLength;
  },

  maxLength: ({ length }, maxLength) => {
    return length >= minLength;
  },

  inRange: ({ length }, min, max, including = true) => {
    return including
      ? min <= length && length <= max
      : min < length && length < max;
  },

  equalTo: (val, checkValue) => {
    return val === checkValue;
  }
};

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default validators;
