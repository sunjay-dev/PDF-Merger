const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const multer = require('multer');
const { mergedpdf, mergedpdf_with_pages } = require('./merger.js');


const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3000;

let d;
let oldPDFs;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templetes', 'index.html'));
});

app.get('/preview/d', (req, res) => {
  if (d) {
    res.send(d.toString());
  } else {
    res.send('No preview available');
  }
});

app.post('/preview', upload.array('PDFs', 2), async (req, res, next) => {
  oldPDFs = req.files.map(file => file.path);
  d = await mergedpdf(oldPDFs[0], oldPDFs[1]); // Merge the new PDF

  
  console.log(oldPDFs[0]);
  res.sendFile(path.join(__dirname, 'templetes', 'preview.html'));
});

app.post('/merge', upload.array('PDFs', 2), async (req, res, next) => {
  res.redirect(`http://localhost:${port}/static/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.post('/preview/pages', async (req, res) => {
  let pdf1 = req.body.page1;
  let pdf2 = req.body.page2;
  console.log(req.body.page2);
  console.log(req.body.page1);
  console.log(oldPDFs[0]);
  console.log(oldPDFs[1]);

  response = {  
    page1:req.body.page1,  
    page2:req.body.page2 
};  
console.log(response);  
  d = await mergedpdf_with_pages(oldPDFs[0], oldPDFs[1], pdf1, pdf2);
  if (d) {
      res.send(d.toString());
  } else {
      res.status(404).send('PDF not found');
  }
});
