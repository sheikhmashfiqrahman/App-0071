const fs = require("fs");
const path = require("path");

const streamMovie = async (request, response) => {
  //define the path of the asset
  const assetPath = path.resolve(
    __dirname,
    `../../assets/${request.params.assetName}`
  );
  
  //get the size of the asset using fs' statistics
  const assetSize = fs.statSync(assetPath).size;

  //specifies the browser range required
  const browserRange = request.headers.range;
  
  if (browserRange) {

    console.log(browserRange);
    //get the amount of bytes from the browser
    const browserBytesAmount = browserRange.replace(/bytes=/, "").split("-");
    const start = parseInt(browserBytesAmount[0], 10);
    let end;
    if(browserBytesAmount[1]) end = parseInt(browserBytesAmount[1], 10);
    else end = assetSize - 1;
    const chunksize = end - start + 1;
    const asset = fs.createReadStream(assetPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${assetSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    response.writeHead(206, head);
    asset.pipe(response);
  } else {
    const head = {
      "Content-Length": assetSize,
      "Content-Type": "video/mp4",
    };
    response.writeHead(200, head);
    fs.createReadStream(assetPath).pipe(response);
  }
  
};

module.exports = { streamMovie };
