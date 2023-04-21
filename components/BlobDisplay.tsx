import { useEffect, useState } from "react";
// import styled from 'styled-components'

// const ChatImg = styled.img`
//     height: auto;
//     width: 100%;
// `

interface BlobProps {
    blob: any;
  }

const BlobDisplay: React.FC<BlobProps> = ({blob}) => {
    const [ imgSrc, setImageSrc ] = useState<any>('');
  
    useEffect( () => {
      const reader = new FileReader();
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        setImageSrc( reader.result );
      }
  
    }, [blob])
  
    return <img src={imgSrc}  alt="img" style={{height: 'auto', width: '100%'}}/>
}

export default BlobDisplay;