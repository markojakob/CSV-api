import fs from 'fs';
import express from 'express';
import { searchSpareParts } from './search.js';

const app = express();

const CSV = fs.readFileSync('LE.txt', 'latin1');
var lines = CSV.split("\n");

var headers = [
  'id', 'name', 'header3', 'header4', 'header5', 
  'header6', 'header7', 'header8', 'header9', 'brand', 'price', 'sn'
];

var result = [];

lines.forEach(line => {
  var elements = line.split("\t");
  var obj = {};
  headers.forEach((header, index) => {
    obj[header] = elements[index].replace(/^"|"$/g, '').trim();
  });
  result.push(obj); 
});

result.splice(30);

app.get('/spare-parts', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json(result);
});

app.get('/search-spare-parts', (req, res) => {
  const queryParams = req.query;
  const results = searchSpareParts(queryParams, result);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json(results);
});

app.get('/', (req, res) => {
  res.send("Welcome to the Spare Parts API! Visit /spare-parts for all data and /search-spare-parts for searching.");
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
