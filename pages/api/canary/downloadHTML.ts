// pages/api/downloadHTML.js

export default function handler(request, response) {
  const { childStates } = req.body;

  // construct your HTML content
  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body style="font-size: 20px">
        ${childStates.contentExec}
        ${childStates.contentSitu}
        ${childStates.contentMark}
        ${childStates.contentOp}
        ${childStates.contentMang}
        ${childStates.contentFin}
        ${childStates.contentRisk}
      </body>
    </html>
  `;

  // set Headers and Content-Disposition (important) which will tell browser to download
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Disposition', 'attachment; filename=myFile.html');
  
  res.status(200).send(htmlContent);
}
