const express = require('express')
const timeout = require('connect-timeout')
const utils = require('./utils.js')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const origin = process.env.ORIGIN_ID

const timeToTimeout = "5s"

express()
  .use(timeout(timeToTimeout))
  .get('/activate', async function (req, res) {
    res.send({ status: 200, message: "heroku is up" })
  })
  .get('/audio', async function (req, res) {
    const songUrl = req.query.songUrl
    console.log(origin)
    if (req.query.originId && req.query.originId != origin) return res.send({ status: 401, message: "Unauthorized access" })
    console.log("converting track...")
    const filePath = await utils.getConvertedSong(songUrl)
    res.sendFile(`${__dirname}/${filePath}`, function () {
      utils.deleteSong(filePath)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
