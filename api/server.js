const express = require('express');
const app = express();
const fs = require('fs');

const FOLDER_ROOT = process.env.FOLDER_ROOT || 'videos';
const ENTRY_POINT = process.env.ENTRY_POINT || '/api';

const getFilesFromFolder = (foldername) => {
    let result = []
    let files = fs.readdirSync(foldername);

    files.forEach(element => {
        if(fs.lstatSync(foldername + "/" + element).isDirectory()){
            result.push({
                type: "d",
                name: element
            })
        }
        else if (fs.lstatSync(foldername + "/" + element).isFile()){
            result.push({
                type: "f",
                name: element
            })
        }
    });

    return result;
}

app.use(function(req, res, next) {
    // Enable cross origin for development domain only.
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get(ENTRY_POINT + '*', (req, res) => {
    folder = req.originalUrl.replace(ENTRY_POINT, FOLDER_ROOT)
    console.log(folder)
    res.send(getFilesFromFolder(folder));
});

app.use('/public', express.static('videos'));

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

