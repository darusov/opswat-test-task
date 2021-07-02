// The problem of CORS solved.
// This code can be upgraded in many ways like splitting code,
// adding dotenv file, https, security, etc. If it's needed -
// please write full requirements to back-end side.

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const api = 'https://api-dev.metadefender.com/v4';

const getData = async (req, res) => {
  const { apiKey, endpoint, fileHash } = req.query;
  try {
    const apiKeyStatus = await fetch(`${api}/apikey/`, {
      headers: {
        Apikey: apiKey,
      },
    })
      .then(({ status }) => status)
      .catch(error => res.status(500).json({ error: 'Something goes wrong.' }));

    if (apiKeyStatus === 200) {
      let url = '';
      if (!endpoint.indexOf(api)) {
        url = `${endpoint}/${fileHash}`;
      } else {
        url = `${api}/${endpoint}/${fileHash}/`
      }

      const fileData = await fetch(url, {
        headers: {
          Apikey: apiKey,
        },
      })
        .then((data) => data.json())
        .catch(error => console.log(error));
      
      res.send(fileData);
    } else {
      res.status(400).json({ error: 'Api key is not valid.' })
    }
  } catch (error) {
    res.status(400).send('Something goes wrong.');
  }
};

app.get('/getData', getData);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
