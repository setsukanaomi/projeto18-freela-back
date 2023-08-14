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

export async function GetMyPoros(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const myUser = (
      await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
    ).rows[0];

    if (!myUser) return res.sendStatus(409);

    const myPoros = (
      await db.query(`SELECT * FROM poros WHERE "ownerId"=$1`, [myUser.userId])
    ).rows;

    res.status(200).send(myPoros);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function TurnPoroDisabled(req, res) {
  const { id } = req.params;

  try {
    await db.query(`UPDATE poros SET available='false' WHERE id = $1;`, [id]);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
