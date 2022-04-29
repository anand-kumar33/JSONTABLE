import React, { useState } from "react";
import "./form.css";
import { CSVLink } from "react-csv";
import { getHeader, convertJSONToTable } from "../services/flat";
import JSONTable from "./table";

export default function InputForm() {
  const [tableData, setTableData] = useState([]);
  const [jsonData, setJSONData] = useState();

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log(e.target.result);
      onJSONDataChange(null, e.target.result);
    };
  };
  const csvReport = {
    data: tableData,
    filename: "ConvertedCSv.csv",
  };
  function onJSONDataChange(e, fileJSON) {
    try {
      const value = e ? e.target.value : fileJSON;
      const parsed = JSON.parse(value);
      setJSONData(parsed);
    } catch (e) {
      alert("Not a valid json");
    }
  }
  console.log(jsonData);
  async function viewTable() {
    const headers = await getHeader(jsonData);
    console.log(headers);
    convertJSONToTable(headers, jsonData, (result) => {
      console.log(result);
      setTableData(result);
    });
  }
  return (
    <div>
      <h1 className="head">CONVERT JSON TO TABLE FORM</h1>
      <form className="form">
        <label className="label">INPUT PLACE FOR JSON DATA:</label>
        <textarea
          name="jsonData"
          type="text"
          className="text"
          onChange={onJSONDataChange}
          value={JSON.stringify(jsonData, 2, 2)}
        ></textarea>
        <div style={{ marginTop: "4px", marginLeft: "10px" }}>
          <label className="label2">SELECT A JSON FILE:</label>
          <input
            type="file"
            onChange={handleChange}
            style={{ color: "black", marginLeft: "8px" }}
          ></input>
        </div>
        <button className="button" type="button" onClick={viewTable}>
          Convert Json to Table
        </button>
        <CSVLink
          style={{ color: "#0471C4", marginLeft: "33px" }}
          {...csvReport}
        >
          Export to CSV
        </CSVLink>
      </form>
      <div className="tabledata">
        <JSONTable data={tableData} />
      </div>
    </div>
  );
}
