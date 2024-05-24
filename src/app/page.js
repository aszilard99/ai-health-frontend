'use client'

import { useState } from "react"
import FileDragField from './components/FileDragField';
import { Calistoga } from "next/font/google";
import LinearGauge from "./components/LinearGauge";

const calistoga = Calistoga({
  subsets: ['latin'],
  weight: "400"
})

export default function Home() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState(null);

  return (
    <main>
      <div className="navbar">
        <p className={calistoga.className} id="navbar-text">Ai-Health</p>
      </div>
      <FileDragField file={file} setFile={setFile} result={result} setResult={setResult}/>
      {result && <LinearGauge result={result}/>}
    </main>
  );
}
