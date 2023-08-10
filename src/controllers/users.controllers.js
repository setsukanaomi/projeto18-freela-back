import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";

export async function signup(req, res) {
  const { name, email, cpf, telephone, password } = req.body;
  const cryptoPassword = bcrypt.hashSync(password, 10);

  try {
    const userExists = await db.query(
      `SELECT * from users WHERE email=$1 OR cpf=$2`,
      [email, cpf]
    );
    if (userExists.rowCount > 0)
      return res
        .status(409)
        .send("Esse CPF ou e-mail já se encontra cadastrado!");

    await db.query(
      `INSERT INTO users ("name", cpf, email, telephone, "password") VALUES ($1, $2, $3, $4, $5)`,
      [name, cpf, email, telephone, cryptoPassword]
    );
    res.status(201).send("Cadastro efetuado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signin(req, res) {}
