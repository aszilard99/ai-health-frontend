'use client'

import { useState } from "react"
import FileDragField from './components/FileDragField';
import { Calistoga } from "next/font/google";
import LinearGauge from "./components/LinearGauge";
import ImagePreview from "./components/ImagePreview";
import { Button } from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import Image from "next/image";
import logo from "./assets/logo.svg"

const calistoga = Calistoga({
  subsets: ['latin'],
  weight: "400"
})

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div>
      <div className="navbar">
        <p className={calistoga.className} id="navbar-text">Ai-Health</p>
        <Image src={logo} className="logo"/>
      </div>
      <div className="central-section-placeholder">
        {!image ? <FileDragField image={image} setImage={setImage} setResult={setResult} setError={setError}/> : <ImagePreview image={image}/>}
      </div>
      <div className="linear-gauge-placeholder">
      {result && <LinearGauge result={result}/>}
      {error && 
          <Textarea
            isInvalid={true}
            label="Error"
            isReadOnly
            defaultValue="Invalid file extension, it has to be .jpg or .jpeg"
            value={error}
            variant="bordered"
            className="max-w-xs mr-auto ml-auto mt-8"
          />
      }
      </div>
      <div className="retry-button-wrapper">
        {image && <Button className="retry-button" color="black" onClick={() => {
          setImage(null);
          setResult(null);
          setError(null);
        }}
        >
          <p className="tracking-wider font-bold">Retry</p>
        </Button>}
      </div>
    </div>
  );
}
