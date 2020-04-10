const express = require('express')
const timeout = require('connect-timeout')
const utils = require('./utils.js')

const PORT = process.env.PORT || 5000

const timeToTimeout = "5s"
 
express()
  .use(timeout(timeToTimeout))
  .get('/audio/:id', async function (req, res) {
    const id = req.params.id
    console.log("converting track...")
    const filePath = await utils.getConvertedSong(id)
    res.sendFile(`${__dirname}/${filePath}`, function () {
        utils.deleteSong(filePath)
    })
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
