import React from "react";
import "./styles.css";

const History = ({ results }) => {
  return (
    <div aria-label="history">
      <h2>Operations History</h2>
      <div className="historyContainer">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Number A</th>
              <th>Operation</th>
              <th>Number B</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result.a}</td>
                <td>{result.operation}</td>
                <td>{result.b}</td>
                <td>{result.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
