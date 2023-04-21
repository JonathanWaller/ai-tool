// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

import img from '@/assets/images/balloons.png'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

type Data = {
    image: any;
}

// export default async function handler(
//   req: NextApiRequest<data>,
//   res: NextApiResponse
// ) {
export default async function handler( req:any, res:any ) {

    const { image } = req.body;
    console.log('teting; ' , image)
//   const {prompt} = req.query; // comes from url

//   if( !prompt) {
//     return res.status(400).json({error: 'Prompt missing'})
//   }

//   if( prompt.length > 100) {
//     return res.status(400).json({error: 'Prompt too long'})
//   }

    // const promise = fs.promisees.readFile(image);

    // const promise = fs.readFile(image)

    // console.log('promise: ', promise)

    // const str = image.toString('base64');
    // const buffer = Buffer.from(str, 'base64');
    // const buffer = [image];


    // const arrayBuffer = await image.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    //     const file: any = buffer;
    //     file.name = 'image.png';

    //     console.log('bufer: ', file)

    console.log('what is image: ', image)

//    const completion = await openai.createImageVariation(
//         fs.createReadStream(image),
//         // fs.createReadStream(img)
//         // file,
//         1
//         // img
//         // prompt
//     )


//     console.log('COMPLETION: ', completion)

  // const completion = await openai.createImageVariation({
  //   // prompt: `Create a cartoon version of the following subject .\n 
  //   // Topic: ${prompt}\n 
  //   // Witty response:`,
  //   // n: 1, // # of images to generate
  //   // size: "1024x1024",

  //   image: prompt , /// png
  //   n: 1,
  //   // size: "1024x1024",
  // })

  // const createdImage = completion.data.data[0].url;

  // res.status(200).json({createdImage});
  res.status(200).json({test: 'hello'})
}
