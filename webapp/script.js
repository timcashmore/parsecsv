function parseCSV() {
    const fileInput = document.getElementById('csvFileInput');
  
    if (fileInput.files.length === 0) {
      alert('Please select a CSV file.');
      return;
    }
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const csvContent = e.target.result;
      const lines = csvContent.split('\n');
  
      // Process the header row
      const headers = lines[0].split(',').map(header => header.trim());
      const idIndex = headers.indexOf('Id');
      const implementedByIndex = headers.indexOf('Implemented by');
  
      // Process data rows
      const csvData = [];
      csvData.push('"Id","Implemented by"'); // Add the header row for selected columns
  
      lines.slice(1).forEach(line => {
        const columns = parseCSVLine(line);
  
        // Check if the data row has at least the same number of columns as the header row
        if (columns.length >= headers.length) {
          const idValue = columns[idIndex].trim();
          const implementedByValue = columns[implementedByIndex].trim();
          //console.log("Id: "+idValue+" implemnentedByValue: "+implementedByValue);
          // If 'Implemented by' has multiple values, create additional rows
          if (implementedByValue.includes('-')) {
            const implementedByValues = implementedByValue.split('-').map(value => value.trim());
  
            implementedByValues.forEach(implValue => {
              // Create a new row for each parsed value in 'Implemented by' with only 'Id' and 'Implemented by'
              const newRowData = [`"${idValue}"`, `"${implValue}"`];
              //console.log("newRow: "+newRowData);
              csvData.push(newRowData.join(','));
            });
          } else {
            // If 'Implemented by' has a single value or is blank, create a direct copy of the input row with only 'Id' and 'Implemented by'
            const newRowData = [`"${idValue}"`, `"${implementedByValue}"`];
            console.log("newRow: "+newRowData);
            csvData.push(newRowData.join(','));
          }
        } else {
          console.error('Skipping row due to inconsistent number of columns:', line);
        }
      });
  
      // Convert CSV data to a string
      const csvString = csvData.join('\n');
  
      // Create a Blob with the CSV content
      const blob = new Blob([csvString], { type: 'text/csv' });
  
      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'converted_data.csv';
      link.click();
    };
  
    reader.readAsText(file);
  }
  
  function parseCSVLine(line) {
    // A CSV parser that handles both quoted and unquoted values
    const columns = [];
    let currentColumn = '';
    let insideQuote = false;
  
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
  
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        columns.push(currentColumn);
        currentColumn = '';
      } else {
        currentColumn += char;
      }
    }
  
    columns.push(currentColumn);
  
    return columns;
  }
  
  