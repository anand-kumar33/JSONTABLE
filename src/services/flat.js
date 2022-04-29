const flat = require("flat");

export async function getHeader(json) {
  const headers = [];

  if (Array.isArray(json)) {
    await json.forEach((x) => headers.push(...Object.keys(flat(x))));
    return [...new Set(headers)];
  } else {
    return Object.keys(flat(json));
  }
}

export function convertJSONToTable(headers, data, callback) {
  const tableData = [];
  tableData.push(headers);
  console.log(tableData);
  if (Array.isArray(data)) {
    for (const x of data) {
      const arr = [];
      for (const header of headers) {
        const keys = header.split(".");
        arr.push(keys.reduce((a, b) => a[b] || "", x));
      }
      tableData.push(arr);
    }

    return callback(tableData);
  } else {
    return callback(tableData);
  }
}
