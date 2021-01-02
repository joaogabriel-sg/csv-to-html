const tableContainer = document.querySelector('.table-container');
const fieldFile = document.querySelector('.field-file');

const getColumns = (column, content) => column += `<td>${content}</td>`;

const getRows = (rows, data) => {
  const row = data.replace(/,\s|,|\|/g, ', ').split(', ');
  const columns = row.reduce(getColumns, '');
  return rows += `<tr>${columns}</tr>`;
}

const defineTableBodyContent = (tbody, datas) =>
  tbody.innerHTML = datas.reduce(getRows, '');

const defineTableHeadings = (thead, datas) => 
  thead.innerHTML = datas.replace(/,\s|,|\|/g, ', ')
    .split(', ')
    .reduce((acc, data) => acc += `<th>${data}</th>`, '');

const addTableIntoDOM = (dataString) => {
  tableContainer.innerHTML = '';

  const table = document.createElement('table');
  const thead = table.createTHead();
  const tbody = table.createTBody();
  
  const datasWithoutLineBreak = dataString.split('\n')
    .filter((data) => data !== '');

  defineTableHeadings(thead, datasWithoutLineBreak[0]);
  defineTableBodyContent(tbody, datasWithoutLineBreak.splice(1));

  tableContainer.appendChild(table);
}

const readFileUploaded = () => {
  const reader = new FileReader();
  const file = fieldFile.files[0];
  
  reader.onload = ({ target: { result } }) => addTableIntoDOM(result);
  reader.readAsText(file);
}

const upload = () => {
  const regexToCsvAndTxt = /([a-zA-Z0-9\s.\\:_-])+(.csv|.txt)/g;
  const filenameToTest = fieldFile.value.toLowerCase();

  const isCsvOrTxtAndFileReaderExists = regexToCsvAndTxt.test(filenameToTest) 
    && typeof (FileReader) !== 'undefined';

  if (isCsvOrTxtAndFileReaderExists) readFileUploaded();
}

fieldFile.addEventListener('change', upload);
