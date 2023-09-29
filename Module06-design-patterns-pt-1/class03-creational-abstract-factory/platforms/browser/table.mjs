import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    document.body.insertAdjacentHTML("afterBegin", template);
  }

  prepareData(data) {
    const [first, ...rest] = data;
    const tHeaders = Object.keys(first)
      .map((key) => `<th scope="col">${key}</th>`)
      .join("");
    const tRows = rest
      .map((item) => {
        const tData = Object.values(item)
          .map((value) => `<td>${value}</td>`)
          .join("");
        return `<tr>${tData}</tr>`;
      })
      .join("");
    const table = `<table class="table"><thead><tr>${tHeaders}</tr></thead><tbody>${tRows}</tbody></table>`;
    return table;
  }
}
