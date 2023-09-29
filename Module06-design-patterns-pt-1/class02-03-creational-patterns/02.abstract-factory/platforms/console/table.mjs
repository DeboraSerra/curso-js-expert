import chalk from "chalk";
import chalkTable from "chalk-table";
import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data);
    const options = {
      columns,
      leftPad: 2,
    };
    const table = chalkTable(options, data);
    console.log(table);
  }

  prepareData(data) {
    const [first, ...rest] = data;
    const formatHeader = (data, index) =>
      index % 2 === 0
        ? chalk.bgBlue.white.bold(data)
        : chalk.bgBlueBright.white.bold(data);
    const columns = Object.keys(first).map((key, index) => ({
      field: key,
      name: formatHeader(key, index),
    }));
    return columns
  }
}
