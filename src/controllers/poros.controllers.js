import { db } from "../database/database.connection.js";

export async function getPoros(req, res) {
  try {
    const poros = (await db.query(`SELECT * FROM poros WHERE available=true`)).rows;

    res.status(200).send(poros);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
