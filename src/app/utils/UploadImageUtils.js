export default async function handleImageUpload(e, setImage, setFileEnter, setResult) {
    e.preventDefault();

    setFileEnter && setFileEnter(false);
    
    let file;
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item, i) => {
            if (item.kind == 'file') {
                const tmpFile  = item.getAsFile();
                if (tmpFile) {
                    file = tmpFile;
                }
            }
        });
    } else {
        [...e.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
        })
    }
    if (file) {
        setImage(URL.createObjectURL(file));
        const formData = uploadFile(file);
        const result = await sendRequest(formData);
        setResult(result);
    }
}

export function uploadFile (file) {
    const formData = new FormData();
    formData.append('image', file);

    return formData;
}

export async function sendRequest (formData) {
    try {
        const response = await fetch("http://127.0.0.1:8080/classify", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        console.log("Classification Successful: ", result);
        return result;

    } catch (error) {
        console.error("Error: ", error);
    }
}