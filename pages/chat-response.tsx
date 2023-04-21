import {FormEvent, useState} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import mainImage from '@/assets/images/ai-image.jpeg'

import TypedText from '@/components/TypedText/TypedText';
import Input from '@/components/Input';
import Button from '@/components/Button';

const ChatResponse = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent from refresh of page
        const formData = new FormData(e.target as HTMLFormElement);
        const prompt = formData.get('prompt')?.toString().trim(); // remove whitespace
    
        if( prompt ) {
          // setResult( prompt)
    
    
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
        <>
          <Head>
            <title>JW AI</title>
            <meta name="description" content="by Jonathan Waller" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={styles.pageContainer}>
            <div className={styles.bannerImageContainer}>
            <Image
                src={mainImage}
                fill // will fill the container
                alt='main img'
                priority
                className={styles.mainImage}
              />
            </div>

          <main className={styles.main}>
            <h1>JW AI</h1>
            <div className={styles.mainImageContainer}>
              <Image
                src={mainImage}
                fill // will fill the container
                alt='main img'
                priority
                className={styles.mainImage}
              />
            </div>
    
            <div className={styles.lowerContainer}>
              <form onSubmit={handleSubmit} className={styles.inputForm}>
                <label>Ask a question...</label>
                <Input placeholder='e.g. why is the sun hot' name='prompt' />
                <Button disabled={loading}>Submit</Button>
              </form>
            
            
              {loading && <div>loading</div>}
              {error && <div>Something went wrong. Please try again.</div>}
              {/* { result && <h5>{result}</h5>} */}
    
              {result && (
                <h4>
                  <TypedText textStr={result} delay={100}/>
                </h4>
              )}
    
            </div>
          </main>
          </div>
        </>
      ) 
}

export default ChatResponse;