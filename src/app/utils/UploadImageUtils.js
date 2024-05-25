export default function handleImageUpload(e, setImage, setFileEnter, setResult) {
    e.preventDefault();
    setFileEnter(false);
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item, i) => {
            if (item.kind == 'file') {
                const file  = item.getAsFile();
                if (file) {
                    setImage(URL.createObjectURL(file));
                    uploadFile(file, setResult);
                }
            }
        });
    } else {
        [...e.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
        })
    }
}

export function uploadFile (file, setResult) {
        
    const formData = new FormData();
    formData.append('image', file);
    sendRequest(formData, setResult);
}

export async function sendRequest (formData, setResult) {
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