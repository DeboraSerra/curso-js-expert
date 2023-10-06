const [, , ...commands] = process.argv;

function parseCommands(commands) {
  // const parsedCommands = {}
  // commands.forEach((command, index) => {
  //   if (command.startsWith('--')) {
  //     const parsedCommand = command.slice(2)
  //     parsedCommands[parsedCommand] = commands[index + 1]
  //   }
  // })
  // return parsedCommands
  const cmd = new Map();
  const commandPrefix = "--";
  for (const key in commands) {
    const index = parseInt(key);
    const command = commands[key];
    if (!command.includes(commandPrefix)) continue;
    cmd.set(command.replace(commandPrefix, ""), commands[index + 1]);
  }
  return Object.fromEntries(cmd);
}

console.log(parseCommands(commands));
