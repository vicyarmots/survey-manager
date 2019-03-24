import Joi from "joi";

export const schemaUser = {
  firstName: Joi.string()
    .trim()
    .min(2)
    .required(),
  login: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=(.*\d){2,})/)
    .regex(/^(?=.*[A-Z]{1,})/)
    .trim()
};

export const schemaSurvey = {
  quest: Joi.string()
    .min(4)
    .required(),
  name: Joi.string()
    .min(4)
    .required(),
  surveyName: Joi.string()
    .min(4)
    .required(),
  body: Joi.string()
    .min(2)
    .required()
};

export const getErrorMessage = (value, schema, key) => {
  const { error } = Joi.validate(value, schema[key]);
  return !!error ? error.details[0].message.replace('"value"', "") : null;
};

export const Validation = (value, schema, key, component) => {
  const { error } = Joi.validate(value, schema[key]);
  if (!!error) {
    if (error.details[0].message.search(/pattern/) > 0) {
      if (error.details[0].message.split(" ").pop().length > 17) {
        component.setState({
          [key]: {
            ...component.state[key],
            error: "password must have at least one capital letter"
          }
        });
      } else {
        component.setState({
          [key]: {
            ...component[key],
            error: "password must have two digits"
          }
        });
      }
    } else {
      component.setState({
        [key]: {
          ...component.state[key],
          error: error.details[0].message.replace('"value"', "")
        }
      });
    }
  } else if (error === null) {
    component.setState({
      [key]: {
        ...component.state[key],
        error: null
      }
    });
  }
};
