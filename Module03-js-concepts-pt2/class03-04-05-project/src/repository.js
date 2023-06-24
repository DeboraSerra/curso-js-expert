import { writeFile, readFile } from 'fs/promises'

export const save = async (data) => {
  const { pathname } = new URL('./../database.json', import.meta.url)
  const info = JSON.parse(await readFile(pathname, 'utf-8'))
  await writeFile(pathname, JSON.stringify([...info, data]))
}