import { useState } from "react"
import handleImageUpload from "../utils/UploadImageUtils";
import { uploadFile } from "../utils/UploadImageUtils";

export default function FileDragField({image, setImage, setResult}) {
    const [fileEnter, setFileEnter] = useState(false);
    
    return (
            <div>
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
                        handleImageUpload(e, setImage, setFileEnter, setResult);
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
        </div>
    )
}

