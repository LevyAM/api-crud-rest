const { body, validationResult, check, param, checkSchema} = require("express-validator");
const { options } = require("../models/User");

const createUserValidation = () => {
  return [
    // check("email").not().exists().withMessage("Email já cadastrado!"),
    check("email").isEmail().withMessage("Email inválido!"),
    check("name").notEmpty().withMessage("Usuário não pode ser vazio"),
    check("password").isLength({ min: 8}).withMessage("Senha inválida, são necessário pelo menos 8 caracteres"),
  ];
};

const findUserValidation = () => {
  return [
    check("id").exists().withMessage("O id informado não existe"),
    check("id").isNumeric().withMessage("O id precisa ser um número"),
  ];
};

const loginValidation = () => {
    return [
        check("email").isEmail().withMessage("Email inválido!"),
        check("password").isLength({ min: 8}).withMessage("Senha inválida, são necessário pelo menos 8 caracteres"),
    ];
  };

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty() ) {
    return next();
  } else {
    allErrors = [];
    errors.array().map((err) => allErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({ errors: allErrors });
  }
};

module.exports = {
    loginValidation,
  findUserValidation,
  createUserValidation,
  validate,
};
