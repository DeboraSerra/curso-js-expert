const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require('assert');

;(async () => {
  {
    const filePath = './mocks/invalid-header.csv';
    const expected = new Error(error.WRONG_HEADER);
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }
  {
    const filePath = './mocks/invalid-empty.csv';
    const expected = new Error(error.WRONG_FILE_LENGTH);
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }
  {
    const filePath = './mocks/invalid-long.csv';
    const expected = new Error(error.WRONG_FILE_LENGTH);
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }
  {
    const filePath = './mocks/valid.csv';
    const expected = [
      {
        id: 1,
        name: 'monica',
        profession: 'teacher',
        age: 58
      },
      {
        id: 2,
        name: 'jose',
        profession: 'militar',
        age: 63
      },
      {
        id: 3,
        name: 'debora',
        profession: 'developer',
        age: 30
      }
    ]
    const result = await File.csvToJson(filePath)
    assert.deepEqual(result, expected)
  }
})()