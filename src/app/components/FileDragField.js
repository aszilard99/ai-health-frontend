import { useState } from "react"
import handleImageUpload from "../utils/UploadImageUtils";
import { uploadFile } from "../utils/UploadImageUtils";

export default function FileDragField({image, setImage, setResult, setError}) {
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
                        handleImageUpload(e, setImage, setFileEnter, setResult, setError);
                    }}
                    className={`${fileEnter ? "drag-field-highlighted" : "drag-field-normal"}`}
                    
                >
                    <label
                        htmlFor="file"
                        className="drag-field-label font-light"
                    >
                        Drag and drop an image to upload
                    </label>
            </div>
        </div>
    )
}

