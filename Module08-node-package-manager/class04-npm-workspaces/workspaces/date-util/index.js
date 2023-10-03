import StringUtil from "@debserra/string-util";

const availableFormats = {
  "dd-mm-yyyy": "$<day>-$<month>-$<year>",
  "yyyy-mm-dd": "$<year>-$<month>-$<day>",
  "dd/mm/yyyy": "$<day>/$<month>/$<year>",
};

const yymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g;
const ddmmyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g;

const stringToDate = {
  'dd-mm-yyyy': ddmmyy,
  'dd/mm/yyyy': ddmmyy,
  'yyyy-mm-dd': yymmdd,
}

export default class DateUtil {
  static formatDate(date, format) {
    if (!availableFormats[format]) {
      return { error: `the format ${format} is not available yet` };
    }
    const stringDate = new Date(date)
      .toISOString()
      .match(yymmdd)[0]
      .replace(yymmdd, availableFormats[format]);
    return stringDate;
  }

  static formatString(date, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(date)) return { error: "Your date is empty" };
    if (!availableFormats[currentFormat]) {
      return { error: `the format ${currentFormat} is not available yet` };
    }
    if (!availableFormats[expectedFormat]) {
      return { error: `the format ${expectedFormat} is not available yet` };
    }
    const toDate = stringToDate[currentFormat];
    const stringDate = StringUtil.removeEmptySpaces(date)
      .replace(toDate, availableFormats[expectedFormat]);
    return stringDate;
  }
}
