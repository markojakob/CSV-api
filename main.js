import fs from 'fs';
import express from 'express';


const app = express();


const CSV = fs.readFileSync('LE.txt', 'utf8');
var lines = CSV.split("\n");

var headers = [
  'id', 'name', 'header3', 'header4', 'header5', 
  'header6', 'header7', 'header8', 'header9', 'header10', 'price'
];

var result = [];


lines.forEach(line => {
  var elements = line.split("\t");
  var obj = {};
  headers.forEach((header, index) => {
    obj[header] = elements[index];
  });
  result.push(obj); 
});


app.get('/spare-parts', (req, res) => {
  res.json(result); 
});


app.get('/', (req, res) => {
  res.send("Welcome to the Spare Parts API! Visit /spare-parts to get the data.");
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
