import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate';
import {
  required,
  min,
  max,
  email,
  confirmed,
  min_value,
  max_value,
  alpha_spaces,
  not_one_of as excluded
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('alpha_spaces', alpha_spaces);
    defineRule('password_mismatch', confirmed);
    defineRule('min_value', min_value);
    defineRule('max_value', max_value);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (context) => {
        const messages = {
          required: `The field ${context.field} is invalid`,
          min: `The field ${context.field} is too short`,
          max: `The field ${context.field} is too long`,
          min_value: `The field ${context.field} is too low`,
          max_value: `The field ${context.field} is too high`,
          excluded: `You are not allowed to use this value for the field ${context.field}`,
          email: `The field ${context.field} must be a valid email`,
          country_excluded: `Due to Restricion,You can not access this field`,
          alpha_spaces: `The field ${context.field} must contains only the alphabet characters`,
          password_mismatch: `The password don't match`,
          tos: `You must accept the Terms of Services`
        };
        const message = messages[context.rule.name]
          ? messages[context.rule.name]
          : `The field ${context.field} is invalid`;
        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    });
  }
};
