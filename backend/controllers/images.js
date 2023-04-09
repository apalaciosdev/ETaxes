const fs = require('fs');
const {google} = require('googleapis');
const GOOGLE_API_FOLDER_ID = '1RPYClj1Ntuz3Fsn9_JTTzv2jz89uAcJs';


/**
 * Verifica que se ha recibido el archivo correctamente, lo guarda localmente, usa la función uploadFile() para subirlo y lo borra del local.
 */
async function saveFile(req, res){
  const file = req.file;

  const filePath = `${__dirname}/${file.originalname}`;

  fs.rename(file.path, filePath, async (error) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      try {
        const response = await uploadFile(file.originalname, filePath);
        res.json(
          response
        )
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
    }
  });
}


/**
 * Se encarga de subir la imágen a un repositorio de Drive utilizando la API de Google
 */
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
      fields: 'id, webContentLink'
    })

    fs.unlink(filePath, (error) => {
      if (error) {
        console.error(error);
      }
    });

    const urlImage = response.data.webContentLink.replace("&export=download", "");
    return urlImage;

  } catch (error) {
    console.log('Upload file error', error)
  }
}

module.exports = {
  uploadFile,
  saveFile
}
