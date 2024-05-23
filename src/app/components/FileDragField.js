import { useState } from "react"
import Image from "next/image";
import image from "../assets/icons/gauge.png"

export default function FileDragField({ file, setFile }) {
    const [fileEnter, setFileEnter] = useState(false);
    const [result, setResult] = useState(null);
    let myFile;

    function uploadFile (file) {

        const formData = new FormData();
        //TODO this parameter name might have to be changed according to endpoint param name
        formData.append('image', file);
        sendRequest(formData);
    }
    
    async function sendRequest (formData) {
        try {
            const response = await fetch("http://127.0.0.1:8080/classify", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            setResult(result);
            console.log("Success: ", result);
    
        } catch (error) {
            console.error("Error: ", error);
        }
    }

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
                                        uploadFile(file);
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
                    className={`${fileEnter ? "drag-field-highlighted" : "drag-field-normal"}`}
                    
                >
                    <label
                        htmlFor="file"
                        className="drag-field-label"
                    >
                        Click to upload or drag and drop
                    </label>
                    <input 
                        id='file' 
                        type='file' 
                        className="drag-field-input"
                        onChange={(e) => {
                            console.log(e.target.files);
                            const files = e.target.files;
                            if (files && files[0]) {
                                uploadFile(files[0]);
                            } 
                        }}
                    />
            </div>
            }
            {file && 
            <>
                <div className="text-center">Uploaded file browser blob url: {file}</div>
                <button type='button' className="classify-image-btn" onClick={()=>{
                    file && uploadFile(myFile);
                }}>
                    Classify image
                </button>
            </>
            }
            {result && 
                <div >
                    Result is: {result}
                </div>
            }
        <div style={{ position: 'relative', width: '100%', height: '200px'}}>

        </div>
        </div>
    )
}

