import {FormEvent, useState, useEffect} from 'react';
import Head from 'next/head'
import type { NextPageWithLayout } from './_app'
import styles from '@/styles/Home.module.css'

import Layout from '@/components/Layout';
import TypedText from '@/components/TypedText/TypedText';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Loader from '@/components/Loader';

const ChatResponse: NextPageWithLayout = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent from refresh of page
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim(); // remove whitespace
  
    if( prompt ) {
      try {
        setResult('')
        setLoading( true );
        setError( false );

        const response = await fetch(`/api/open-ai?prompt=${encodeURIComponent(prompt)}`);
        const body = await response.json();
        setResult(body.quote);
      } catch (e) {
        console.error(error);
        setError(true)
      } finally {
        setLoading( false );
      }
    }
  }


  return (
    <div id="top">
      <Head>
        <title>JW AI</title>
        <meta name="description" content="by Jonathan Waller" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>

      <div className={styles.view}>
      {/* <main className={styles.main}> */}
        <div className={styles.columnLeft}>
          <div>Chat Response</div>
          <div>Ask a question and receive a response from the bot.</div>    
          <div>The AI model has been trained to return a witty response based on your question.</div>
        </div>

        <div className={styles.columnRight}>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <label>Ask a question...</label>
            <Input placeholder='e.g. why is the sun hot' name='prompt' />
            <Button disabled={loading}>Submit</Button>
          </form>
        
          <div className={styles.outputContainer}>
            <div className={styles.output}>Output</div>
            {loading && <div style={{marginTop: '-20px'}}><Loader /></div>}
            {error && <div>Something went wrong. Please try again.</div>}

            {result && (
              <h4>
                <TypedText textStr={result} delay={100}/>
              </h4>
            )}
          </div>
          

        </div>
      {/* </main> */}
      </div>
      </div>
    </div>
  ) 
}

ChatResponse.getLayout = function getLayout( page ) {
  return(
    <Layout>
      {page}
    </Layout>
  )
}

export default ChatResponse;