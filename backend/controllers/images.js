const fs = require('fs');
const {google} = require('googleapis');

const GOOGLE_API_FOLDER_ID = '1RPYClj1Ntuz3Fsn9_JTTzv2jz89uAcJs';

async function uploadFile(){
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
      'name': 'testecito.png',
      'parents': [GOOGLE_API_FOLDER_ID]
    }

    const media = {
      mimeType: 'image/png',
      body: fs.createReadStream('controllers/testecito.png')
    }

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: 'id'
    })
    
    return response.data.id;

  } catch (error) {
    console.log('Upload file error', error)
  }
}

module.exports = {
  uploadFile
}

// uploadFile().then(data => {
//   console.log(data)
// })