import database from "../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, 'pt-BR')

async function mainLoop() {
  try {
    const answer = await terminalController.question('What??')
    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('Process finished!')
      return
    }
    const person = Person.generateInstanceFromString(answer)
    console.log('person', person.formatted(DEFAULT_LANG))
    return mainLoop()
  } catch (error) {
    console.error('DEU RUIM**', error)
    return mainLoop()
  }
}

await mainLoop()