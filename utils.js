const { exec } = require("child_process");
const fs = require("fs")

const getConvertedSong = async (songUrl) => {
    const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const newFilePath = `temp/${fileName}_newFile.mp3`
    if (!fs.existsSync("./temp")) await fs.mkdirSync("./temp");
    return new Promise((resolve, reject) => {
        const command = `ffmpeg -i ${songUrl} -ss 00 -to 10 -ac 2 -codec:a libmp3lame -b:a 48k -ar 16000 ${newFilePath}`
        exec(command, { cwd: __dirname }, async (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                 resolve(newFilePath)
            }
            reject(stdout)
        });
    })
}

const deleteSong= async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, function (err) {
            if (err) reject(err)
            resolve()
        })
    })
} 

module.exports = {
    getConvertedSong,
    deleteSong
}