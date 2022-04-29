import React from "react";
// import $ from "jquery";
export default function JSONTable(props) {
  const tableData = props.data;

  if (tableData.length <= 0) return <p>No Table found!</p>;

  const header1 = tableData[0];

  const thead1 = header1.map((heading) => {
    return <th key={heading}>{heading}</th>;
  });

  const getTableRow = (row, index) => {
    return (
      <tr key={row.toString()}>
        {row.map((x, rowIndex) => (
          <td id={`${index}.${rowIndex}`} key={x}>
            {x === "" ? "Null" : x}
          </td>
        ))}
      </tr>
    );
  };

  const tbody = tableData.slice(1).map((row, index) => getTableRow(row, index));

  return (
    <>
      <table contentEditable="true" style={{ width: "100%" }}>
        <thead>
          <tr className="header">{thead1}</tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    </>
  );
}
