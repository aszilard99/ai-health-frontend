'use client'

import { useState } from "react"
import logo from './assets/icons/Logo.png'
import Image from 'next/image';
import FileDragField from './components/FileDragField';

export default function Home() {
  const [file, setFile] = useState('');

  return (
    <main>
      <div className="navbar">
        <Image className='logo' src={logo} width={40} height={40}></Image>
      </div>
      <FileDragField file={file} setFile={setFile}/>
    </main>
  );
}
