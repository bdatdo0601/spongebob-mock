const Jimp = require("jimp");
const fs = require("fs");
const stream = require("stream");
/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.spongeBobImage = async (req, res) => {
  try {
    const { mockMessage } = req.body;
    const input = "./1rn9v3.jpg";
    const output = "./mocked.jpg";
    const resultImg = await Jimp.read(input);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    const resultImgBuffer = await resultImg.print(font, 5, 20, mockMessage).getBufferAsync(Jimp.MIME_JPEG);
    const bufferStream = new stream.PassThrough();
    bufferStream.end(resultImgBuffer);
    res.setHeader("content-type", "image/jpeg");
    bufferStream.pipe(res);
  } catch (error) {
    console.log("something went wrong");
    console.error(error);
  }
};
