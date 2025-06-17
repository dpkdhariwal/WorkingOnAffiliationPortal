// db.js
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('./db.json')
const db = new Low(adapter)

export const initDB = async () => {
  await db.read()
  db.data ||= { users: [] }
  return db
}
