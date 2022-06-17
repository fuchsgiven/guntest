const express = require('express')
const Gun = require('gun');
const app = express()
const port = 443
app.use(Gun.serve);

const server = app.listen(port, () => {})

Gun({ web: server });