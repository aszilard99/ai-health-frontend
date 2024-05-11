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
            <>
                <div className="text-center">Uploaded file browser blob url: {file}</div>
                <button type='button' className="classify-image-btn" onClick={()=>{
                    file && uploadFile(file);
                }}>
                    Classify image
                </button>
            </>
            }
        </div>
    )
}

async function uploadFile (imageObjectUrl) {
    const formData = new FormData();
    const blob = await fetch(imageObjectUrl).then(r => r.blob());
    //TODO this parameter name might have to be changed according to endpoint param name
    formData.set('image', blob);
    sendRequest(formData);
}

async function sendRequest (formData) {
    try {
        const response = await fetch("http://127.0.0.1:8080/classify", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        console.log("Success: ", result);

    } catch (error) {
        console.error("Error: ", error);
    }
}