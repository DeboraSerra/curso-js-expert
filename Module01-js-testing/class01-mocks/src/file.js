const { readFile } = require('fs/promises');
const { error } = require('./constants');

const DEFAULT_OPTIONS = {
  header: ['id', 'name', 'profession', 'age'],
  fileLength: 3,
}
class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, 'utf-8');
    const isFileValid = this.validateFile(content);
    if (!isFileValid.valid) throw new Error(isFileValid.error);
    const result = this.parseCsvToJSON(content)
    return result;
  }

  static validateFile(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...file] = csvString.split(/\r?\n/);
    if (header !== options.header.join(',')) {
      return {
        error: error.WRONG_HEADER,
        valid: false,
      }
    }

    if (!file.length || file.length > options.fileLength) {
      return {
        error: error.WRONG_FILE_LENGTH,
        valid: false,
      }
    }

    return {
      valid: true,
      error: null,
      file,
    }
  }

  static parseCsvToJSON(csvString) {
    const [header, ...file] = csvString.split(/\r?\n/);
    const parsedHeader = header.split(',')
    const result = file.map((item) => {
      const content = item.split(',');
      return content.reduce((acc, val, index) => ({ ...acc, [parsedHeader[index]]: isNaN(val) ? val : +val }), {})
    })
    return result
  }
}

module.exports = File;