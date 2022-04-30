const db = require("../db");
interface Note {
  id: number;
  note_title: string;
  user_id: string;
  note_text: string;
  timestamp: Date;
}

const setNote = async (req: any, res: any, next: any) => {
  const { note_title, user_id, note_text, timestamp }: Note = req.body;

  if (user_id && note_text && timestamp && note_title) {
    const queryString ="INSERT INTO notes(user_id, note_text, timestamp, note_title) VALUES($1, $2, $3, $4) RETURNING *";
    const values = [user_id, note_text, timestamp, note_title];

    await db.query(queryString, values)
      .then((data: any) => {
        res.send(data.rows[0])
      })
      .catch((e: any) => {
        next(e.stack);
      });
  }
};

const getUserNotes = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  if (id) {
    const queryString ="SELECT * FROM notes WHERE user_id = $1 ORDER BY timestamp DESC";
    const values = [id];

    await db.query(queryString, values)
      .then((data: any) => {
         res.send(data.rows);
      })
      .catch((e: any) => {
        next(e.stack);
      });
  }
};

const deleteNote = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  if (id) {
    const queryString ="DELETE FROM notes WHERE id = $1 RETURNING *";
    const values = [id];

    await db.query(queryString, values)
      .then((data: any) => {
         res.send(data.rows);
      })
      .catch((e: any) => {
        next(e.stack);
      });
  }
};

module.exports = { setNote, getUserNotes, deleteNote };
