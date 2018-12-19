const port = 3100;

const express = require('express');
const app = express();
app.listen(port, () => console.log(`Listening on ${port}...`));

app.get('/status', (req, res) => res.json({ status: 'All good!'}));
