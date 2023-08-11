import { db } from "../database/database.connection.js";

export async function getPoros(req, res) {
  try {
    const poros = (await db.query(`SELECT * FROM poros WHERE available=true`))
      .rows;

    res.status(200).send(poros);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getPoroById(req, res) {
  const { id } = req.params;
  try {
    const poro = (
      await db.query(
        `SELECT poros.*, users.name AS "owner", users.telephone, users.email FROM poros
    JOIN users ON poros."ownerId" = users.id
    WHERE poros.id = $1;`,
        [id]
      )
    ).rows[0];
    if (!poro)
      return res
        .status(404)
        .send({ message: "O poro com esse id não existe!" });

    res.send(poro);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
