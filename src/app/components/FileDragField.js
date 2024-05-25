import { useState } from "react"

export default function FileDragField({image, setImage, setResult}) {
    const [fileEnter, setFileEnter] = useState(false);
    
    function uploadFile (file) {
        
        const formData = new FormData();
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
            console.log("Classification Successful: ", result);
    
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
            <div className="container">
                <div 
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
                                        setImage(URL.createObjectURL(file));
                                        uploadFile(file);
                                    }
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
                                setImage(URL.createObjectURL(files[0]));
                                uploadFile(files[0]);
                            } 
                        }}
                    />
            </div>
        <div style={{ position: 'relative', width: '100%', height: '200px'}}>

        </div>
        </div>
    )
}

