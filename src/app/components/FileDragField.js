import { useState } from "react"

export default function FileDragField({ file, setFile }) {
    const [fileEnter, setFileEnter] = useState(false);
    return (
            <div className="container">
                {!file && <div 
                    onDragOver={(e) => {
                        e.preventDefault();
                        setFileEnter(true);
                    }}
                    onDragEnd={(e) => {
                        e.preventDefault();
                        setFileEnter(false);
                    }}
                    onDragLeave={() => {
                        setFileEnter(false);
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        setFileEnter(false);
                        if (e.dataTransfer.items) {
                            [...e.dataTransfer.items].forEach((item, i) => {
                                if (item.kind == 'file') {
                                    const file  = item.getAsFile();
                                    if (file) {
                                        let blobUrl = URL.createObjectURL(file);
                                        setFile(blobUrl);
                                    }
                                    console.log(`item file[${i}].name = ${file?.name}`);
                                }
                            });
                        } else {
                            [...e.dataTransfer.files].forEach((file, i) => {
                                console.log(`… file[${i}].name = ${file.name}`);
                            })
                        }
                    }}
                    className={`${
                        fileEnter ? "border-4" : "border-2"
                    } mx-auto  bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
                    
                >
                    <label
                        htmlFor="file"
                        className="h-full flex flex-col justify-center text-center"
                    >
                        Click to upload or drag and drop
                    </label>
                    <input 
                        id='file' 
                        type='file' 
                        className='hidden'
                        onChange={(e) => {
                            console.log(e.target.files);
                            const files = e.target.files;
                            if (files && files[0]) {
                                let blobUrl = URL.createObjectURL(files[0]);
                                setFile(blobUrl);
                            } 
                        }}
                    />
            </div>
            }
            {file && 
            <div className="text-center">Uploaded file browser blob url: {file}</div>
            }
        </div>
    )
}