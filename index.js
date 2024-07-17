/*
   MSync
   SWR EXPERIMENTALSTUDIO 
   Maurice Oeser
   2023

   Davor Vincze - FLUCHT

   Smartphone Soundfile Controler

   ermöglicht es Soundfiles synchron auf den Handys des Publikums abzuspielen und zu steuern
*/


// **************** Server setup ****************************
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const httpServer = http.createServer(app);


const { Server } = require("socket.io");
const io = new Server(httpServer);


app.use(express.raw({ type: '*/*', limit: '10mb' }));
app.use(express.static('public'));


// app.use(express.static(path.join(__dirname, 'public'), {
//     setHeaders: (res, filePath) => {
//         if (filePath.endsWith('.mp4')) {
//             // Set Cache-Control header for MP4 videos
//             res.set('Cache-Control', 'public, max-age=7200000'); 
//         }
//     }
// }));



app.get('/', (req, res) => {
  console.log(req);
  let data = "heureka";
  res.send(data);
});


app.post("/test", (req,res) => {
  console.log(req.query.project);
  console.log('testfile.xml', req.body);

  // Decode the Base64 string to a binary buffer
  const fileBuffer = Buffer.from(req.body, 'base64');

  // Define the file path where you want to save the file
  const filePath = path.join(__dirname, '/public/projects/uploaded_file.xml');

  // Write the file buffer to a file
  fs.writeFile(filePath, req.body, (err) => {
      if (err) {
          console.error('Failed to save the file:', err);
      } else {
          console.log('File saved successfully.');
      }
  });
  res.send("file uploaded");
});

app.get("/test2", (req, res) => {
  res.sendFile(__dirname + '/public/projects/uploaded_file.xml');
});

httpServer.listen(8080, () => {
  console.log('Server running on port 8080');
});





// ==========================================================



