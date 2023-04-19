// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {prompt} = req.query; // comes from url

  if( !prompt) {
    return res.status(400).json({error: 'Prompt missing'})
  }

  if( prompt.length > 100) {
    return res.status(400).json({error: 'Prompt too long'})
  }

  const completion = await openai.createImage({
    prompt: `Create a cartoon version of the following subject .\n 
    Topic: ${prompt}\n 
    Witty response:`,
    n: 1, // # of images to generate
    size: "1024x1024",
  })

  const createdImage = completion.data.data[0].url;

  res.status(200).json({createdImage});
  // res.status(200).json({test: 'hello'})
}
