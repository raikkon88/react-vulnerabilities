const express = require('express');
const app = express();
const fs = require('fs');





const FOLDER_ROOT = process.env.FOLDER_ROOT || 'videos';

app.get('/', (req, res) => {
    let result = []
    let files = fs.readdirSync(FOLDER_ROOT);

    files.forEach(element => {
        if(fs.lstatSync(FOLDER_ROOT + "/" + element).isDirectory()){
            result.push({
                type: "d",
                name: element
            })
        }
        else if (fs.lstatSync(FOLDER_ROOT + "/" + element).isFile()){
            result.push({
                type: "f",
                name: element
            })
        }
    });

    res.send(result);
});

app.use('/public', express.static('videos'));

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

