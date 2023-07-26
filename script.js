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

  // Now 'data' contains an array of objects, each representing a row in the CSV
  console.log(data);
  // You can do further processing with 'data' here
}
