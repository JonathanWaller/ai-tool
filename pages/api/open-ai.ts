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

  console.log('INSIDE SERVER')
  console.log('REQ: ', req.query)
  const {prompt} = req.query; // comes from url

  if( !prompt) {
    return res.status(400).json({error: 'Prompt missing'})
  }

  if( prompt.length > 100) {
    return res.status(400).json({error: 'Prompt too long'})
  }

  const completion = await openai.createCompletion({
    model: 'text-davinci-003', // from openai's models
    prompt: `Create a cringy motivational quote based on the following topic .\n 
    Topic: ${prompt}\n 
    Cringy motivational quote:`,
    max_tokens: 500, // max response size
    temperature: 1, // creativity
    presence_penalty: 0, 
    frequency_penalty: 0 // gpt is allowed to repeat itself
  })

  const quote = completion.data.choices[0].text;

  res.status(200).json({quote: quote});
  // res.status(200).json({test: 'hello'})
}
