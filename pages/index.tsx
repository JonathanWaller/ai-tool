import {FormEvent, useState} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import mainImage from '@/assets/images/ai-image.jpeg'

export default function Home() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent from refresh of page
    // const formData = new FormData( e.target);
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim(); // remove whitespace
    console.log('submit: ', prompt)

    if( prompt ) {
      try {
        setResult('')
        setLoading( true );
        setError( false );
        
        // const response = await fetch('/api/open-ai?prompt=' + encodeURIComponent(prompt))
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
      <main className={styles.main}>
        <h1>JW AI</h1>
        <h2>Powered by OpenAI</h2>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage}
            fill // will fill the container
            alt='main img'
            priority
            className={styles.mainImage}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <label>Type to ask a question...</label>
          <input 
            name='prompt'
            placeholder='e.g. why is the sun hot'
            maxLength={100}
          />
          <button 
            type='submit'
            disabled={loading}
          >
            Submit
          </button>
        </form>
        
        {loading && <div>loading</div>}
        {error && <div>Something went wrong. Please try again.</div>}
        { result && <h5>{result}</h5>}

      </main>
    </>
  )
}
