import DateUtil from "@debserra/date-util";

console.log(DateUtil.formatDate(new Date("2023-01-01"), "dd/mm/yyyy"));
console.log(DateUtil.formatString("2023-01-01", "yyyy-mm-dd", "dd-mm-yyyy"));
