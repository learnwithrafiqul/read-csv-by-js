function readCSV() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a CSV file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const contents = event.target.result;
    processCSV(contents);
  };

  reader.readAsText(file);
}

function processCSV(contents) {
  const lines = contents.split("\n");

  // Assuming the first line contains headers (column names)
  const headers = lines[0].split(",");

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length === headers.length) {
      const row = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j];
      }
      data.push(row);
    }
  }

  console.log(data);

  // show all data by headers on a table
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  for (let i = 0; i < headers.length; i++) {
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(headers[i]));
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);

  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < headers.length; j++) {
      const td = document.createElement("td");
      td.appendChild(document.createTextNode(data[i][headers[j]]));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  const output = document.getElementById("output");
  output.innerHTML = "";
  output.appendChild(table);
}
