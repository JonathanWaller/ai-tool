import {FormEvent, useState, useRef} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import mainImage from '@/assets/images/space-2.jpeg'
import type { NextPageWithLayout } from './_app'

import Layout from '@/components/Layout';
import Input from '@/components/Input';
import Button from '@/components/Button';

const ImageVariation: NextPageWithLayout = () => {
    const inputRef = useRef<any>(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [ uploadDisplay, setUploadDisplay] = useState<any>();
  const [ uploadFile, setUploadFile ] = useState<any>()
//   const [ imageInput, setImageInput ] = useState<any>()
  const [ dragActive, setDragActive ] = useState<boolean>(false);

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent from refresh of page
    // const formData = new FormData(e.target as HTMLFormElement);
    // const prompt = formData.get('prompt')?.toString().trim(); // remove whitespace

    if( uploadFile ) {

      try {
        setResult('')
        setLoading( true );
        setError( false );

        // const response = await fetch(`/api/imageVariation-ai`, { data: 'hello'});
        // const response = await fetch( `/api/imageVariation-ai`, {
        //     // method: 'POST',
        //     // body: { 'image': 'yes'}

        //     method: 'POST',
        //     body: JSON.stringify({
        //         // image: uploadFile
        //         image: uploadFile
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        console.log('BEFORE: ', uploadFile)
        const formData = new FormData();
        formData.append('image', uploadDisplay);

        console.log('form data: ', formData)

        const response = await fetch( `/api/imageVariation-ai`, {
            method: 'POST',
            body: formData
        })

        const body = await response.json();
        // console.log('got thtat body: ', body.createdImage)
        setResult(body.createdImage);
      } catch (e) {
        console.error(error);
        setError(true)
      } finally {
        setLoading( false );
      }
    }
  }

  /**
     * Handles drag event when user drags image into chat window
     * @param e A keyboard event
     */
    const handleDrag = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    /**
     * Triggers when file is dropped into chat window
     * @param e A keyboard event
     */
    const handleDrop = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // at least one file has been dropped so do something
            // setImageInput([...e.dataTransfer.files]);
            setUploadDisplay( URL.createObjectURL(e.target.files[0]) )
            // setUploadFile( [...e.dataTransfer.files] )
            setUploadFile(e.target.files[0])
            // sendMessage( { type: 'FILE', data: e.dataTransfer.files[0] }) // todo: consider how to handle multiple files at once
        }
    };

    /**
     * Triggers file is selected from file dierectory
     * @param e A keyboard event
     */
    const handleSelectFileAttachment = (e:any) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // console.log('got it: ', e.target.files)
            // at least one file has been selected so do something
            // setImageInput( [...imageInput, ...e.target.files[0]])
            setUploadDisplay( URL.createObjectURL(e.target.files[0]) )
            setUploadFile( [...e.target.files] )
            // sendMessage( { type: 'FILE', data: e.target.files[0] }) // todo: consider how to handle multiple files at once
        }
    };

    // console.log('upload file: ', uploadFile)

    /**
     * Triggers when file attach button is clicked, resulting in file directory to open
     * @param e A keyboard event
     */
    const handleAttachmentClick = (e:any) => {
        e.preventDefault();
        inputRef?.current.click();
    }

    // console.log('display: ', uploadDisplay)

  return (
    <>
      <Head>
        <title>JW AI</title>
        <meta name="description" content="by Jonathan Waller" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>

        <input className={styles.uploadContainer} />

      <main className={styles.main}>
        <h1>Image Variation</h1>
        <div>Upload a PNG to see a tranformation</div>

        <div className={styles.lowerContainer}>

            <div className={styles.actionContainer} onDragEnter={handleDrag}>
                {
                    dragActive ? (
                        <>
                            <div className={styles.dropMessage}>Drop image here</div>
                            <div className={styles.dropMessageBackground}/>
                            <div 
                                className={styles.dragFileElement}
                                onDragEnter={handleDrag} 
                                onDragLeave={handleDrag} 
                                onDragOver={handleDrag} 
                                onDrop={handleDrop}
                            ></div>
                        </>
                    ) : false
                }

                <>
                    <input className={styles.uploadContainer} type="file" accept="image/x-png" id="input-file-upload" ref={inputRef} onChange={handleSelectFileAttachment} />
                    {/* <MessageInput 
                        name="input"
                        placeholder='Type a message...' 
                        onChange={(e: React.ChangeEvent<HTMLInputElement> )=> setInput( e.target.value )}
                        onKeyDown={handleKeyDown}
                        value={input}
                        autoComplete="off"
                    /> */}

                    {/* <ButtonContainer>
                        <Paperclip size={20} color={`${SUPPORT_APP_BLACK}66`} style={{cursor: 'pointer'}} onClick={handleAttachmentClick} />
                        <ArrowUpCircle size={30} strokeWidth={1.2} fill={SUPPORT_APP_GREEN} color={SUPPORT_APP_WHITE} style={{cursor: 'pointer'}} onClick={clickSend}/>
                    </ButtonContainer> */}

                    <Button onClick={handleAttachmentClick} >
                        Upload Image
                    </Button>
                    {
                        uploadDisplay && (
                        <div className={styles.mainImageContainer}>
                            <Image
                            src={uploadDisplay}
                            fill // will fill the container
                            alt='generated image'
                            priority
                            className={styles.mainImage}
                            />
                        </div>
                        )
                    }
                    
                </>
            </div>

            <Button onClick={handleSubmit} >
                Create Variation
            </Button>


          {/* <form onSubmit={handleSubmit} className={styles.inputForm}>
            <label>Enter a topic...</label>
            <Input placeholder='e.g. baby seal'name='prompt'/>
            <Button disabled={loading}>Submit</Button>
          </form> */}
        
        
          {loading && <div>loading</div>}
          {error && <div>Something went wrong. Please try again.</div>}
   

          {result && (
            <div className={styles.mainImageContainer}>
                <Image
                  src={result}
                  fill // will fill the container
                  alt='generated image'
                  priority
                  className={styles.mainImage}
                />
            </div>
          )}

        </div>

      </main>
      </div>
    </>
  )
}

ImageVariation.getLayout = function getLayout(page) {
  return(
    <Layout>
      {page}
    </Layout>
  )
}

export default ImageVariation;
