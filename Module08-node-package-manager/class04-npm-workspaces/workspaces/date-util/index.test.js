import { deepStrictEqual } from "assert";
import DateUtil from "./index.js";

{
  const format = "dd-M-Y";
  const expected = { error: `the format ${format} is not available yet` };
  const date = new Date(1990, 11, 25);
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}
{
  const format = "dd-mm-yyyy";
  const expected = "01-12-1990";
  const date = new Date("1990-12-01");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}
{
  const format = "dd/mm/yyyy";
  const expected = "01/12/1990";
  const date = new Date("1990-12-01");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}
{
  const format = "yyyy-mm-dd";
  const expected = "1990-12-01";
  const date = new Date("1990-12-01");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

// formatString

{
  const expected = { error: "Your date is empty" };
  const date = "";
  const currentFormat = "dd-mm-yyyy";
  const expectedFormat = "dd/mm/yyyy";
  const result = DateUtil.formatString(date, currentFormat, expectedFormat);
  deepStrictEqual(result, expected);
}
{
  const data = {
    value: "1990-April-01",
    currentFormat: "yyyy-M-dd",
  };
  const expected = {
    error: `the format ${data.currentFormat} is not available yet`,
  };
  const result = DateUtil.formatString(data.value, data.currentFormat);
  deepStrictEqual(result, expected);
}
{
  const data = {
    value: "1990-04-01",
    currentFormat: "yyyy-mm-dd",
    expectedFormat: "dd/M/yyyy",
  };
  const expected = {
    error: `the format ${data.expectedFormat} is not available yet`,
  };
  const result = DateUtil.formatString(
    data.value,
    data.currentFormat,
    data.expectedFormat
  );
  deepStrictEqual(result, expected);
}

{
  const data = {
    value: "1990-04-01",
    currentFormat: "yyyy-mm-dd",
    expectedFormat: "dd-mm-yyyy",
  };
  const expected = "01-04-1990";
  const result = DateUtil.formatString(
    data.value,
    data.currentFormat,
    data.expectedFormat
  );
  deepStrictEqual(result, expected);
}
{
  const data = {
    value: "01-04-1990",
    currentFormat: "dd-mm-yyyy",
    expectedFormat: "dd/mm/yyyy",
  };
  const expected = "01/04/1990";
  const result = DateUtil.formatString(
    data.value,
    data.currentFormat,
    data.expectedFormat
  );
  deepStrictEqual(result, expected);
}
{
  const data = {
    value: "04-01-1990",
    currentFormat: "dd-mm-yyyy",
    expectedFormat: "yyyy-mm-dd",
  };
  const expected = "1990-01-04";
  const result = DateUtil.formatString(
    data.value,
    data.currentFormat,
    data.expectedFormat
  );
  deepStrictEqual(result, expected);
}
