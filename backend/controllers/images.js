const fs = require('fs');
const {google} = require('googleapis');

const GOOGLE_API_FOLDER_ID = '1RPYClj1Ntuz3Fsn9_JTTzv2jz89uAcJs';




async function saveFile(req, res){
  const file = req.file;
  console.log(file); // Verifica que se ha recibido el archivo correctamente

  // Aquí puedes guardar el archivo en la misma carpeta donde se encuentra el controlador
  // Para ello, puedes utilizar el módulo `fs` de Node.js:
  const fs = require('fs');
  const filePath = `${__dirname}/${file.originalname}`;
  fs.rename(file.path, filePath, (error) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      uploadFile(file.originalname, filePath);
      res.sendStatus(200);
    }
  });
}
async function uploadFile(fileName, filePath){
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'googleKey.json',
      scopes: ['https://www.googleapis.com/auth/drive']
    })

    const driveService = google.drive({
      version: 'v3',
      auth
    })

    const fileMetaData = {
      'name': fileName,
      'parents': [GOOGLE_API_FOLDER_ID]
    }

    const media = {
      mimeType: 'image/png',
      body: fs.createReadStream(`controllers/${fileName}`)
    }

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: 'id'
    })

    fs.unlink(filePath, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Archivo eliminado: ${filePath}`);
      }
    });
    
    return response.data.id;

  } catch (error) {
    console.log('Upload file error', error)
  }
}

module.exports = {
  uploadFile,
  saveFile
}

// uploadFile().then(data => {
//   console.log(data)
// })