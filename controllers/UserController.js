const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "dasdasdadd124123k123kl1312oi3012eijqdqwdmqowpdmoqi";

class UserController {
  async find(req, res) {
    try {
      let allUsers = await User.findAll();
      allUsers ? res.status(200).json(allUsers) : res.status(204);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async findUser(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.findOne({ where: { id: id } });
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async create(req, res) {
    try {
      let { name, email, password } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      await User.create({
        name: name,
        email: email,
        password: hashPassword,
      });
      res.status(201);
      res.send("Cadastro realizado com sucesso!");
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      let id = parseInt(req.params.id);
      let { name, email } = req.body;
      let user = await User.findByPk(id);
      await User.update(
        {
          name: name,
          email: email,
        },
        { where: { id: id } }
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async delete(req, res) {
    try {
      let id = parseInt(req.params.id);
      await User.destroy({ where: { id: id } });
      res.status(200);
      res.send("Usuário excluído com sucesso");
    } catch (error) {
      res.status(400).json(erros);
    }
  }

  async login(req, res) {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ where: { email: email } });
      let result = await bcrypt.compareSync(password, user.password);
      if (result) {
        let token = jwt.sign({ email: user.email }, secret);
        res.status(200).json({ token: token });
      } else{
        res.status(406).send("Senha incorreta")
      }
    } catch (error) {
      res.status(406).json(error);
    }
  }
}

module.exports = new UserController();
