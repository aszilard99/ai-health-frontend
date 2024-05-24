'use client'

import { useState } from "react"
import FileDragField from './components/FileDragField';
import { Calistoga } from "next/font/google";
import LinearGauge from "./components/LinearGauge";
import ImagePreview from "./components/ImagePreview";

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
      <FileDragField image={image} setImage={setImage} setResult={setResult}/>
      {result && <LinearGauge result={result}/>}
      {image && <ImagePreview image={image} />}
    </main>
  );
}
