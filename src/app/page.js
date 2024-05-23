'use client'

import { useState } from "react"
import FileDragField from './components/FileDragField';
import { Calistoga } from "next/font/google";

const calistoga = Calistoga({
  subsets: ['latin'],
  weight: "400"
})

export default function Home() {
  const [file, setFile] = useState('');

  return (
    <main>
      <div className="navbar">
        <p className={calistoga.className} id="navbar-text">Ai-Health</p>
      </div>
      <FileDragField file={file} setFile={setFile}/>
    </main>
  );
}
