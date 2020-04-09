const express = require('express')
const utils = require('./utils.js')

const PORT = process.env.PORT || 5000

const rateLimit = require("express-rate-limit");
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500 // limit each IP to 100 requests per windowMs
});
 
express()
  .use(limiter)
  .get('/audio/:id', async function (req, res) {
    const id = req.params.id
    const filePath = await utils.getConvertedSong(id)
    res.sendFile(`${__dirname}/${filePath}`, function () {
        utils.deleteSong(filePath)
    })
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
