'use client'

import { useState } from "react"
import FileDragField from './components/FileDragField';
import { Calistoga } from "next/font/google";
import LinearGauge from "./components/LinearGauge";
import ImagePreview from "./components/ImagePreview";
import { Button } from "@nextui-org/react";
const calistoga = Calistoga({
  subsets: ['latin'],
  weight: "400"
})

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <main>
      <div className="navbar">
        <p className={calistoga.className} id="navbar-text">Ai-Health</p>
      </div>
      <div className="central-section-placeholder">
        {!image ? <FileDragField image={image} setImage={setImage} setResult={setResult}/> : <ImagePreview image={image} />}
      </div>
      <div className="linear-gauge-placeholder">
      {result && <LinearGauge result={result}/>}
      </div>
      <div className="retry-button-wrapper">
        <Button className="retry-button" onClick={() => setImage(null)}>Retry</Button>
      </div>
    </main>
  );
}
