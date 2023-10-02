import FluentSQLBuilder from "@debserra/fluentsql";
import database from './database/data.json' assert { type: 'json' }

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(['category'])
  .limit(3)
  .countBy('category')
  .build();

console.log(result);

// para importar de outro diretório usar o comando
// node --experimental-specifier-resolution=node index.js