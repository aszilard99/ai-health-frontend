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
        const response = await sendRequest(formData);
        handleResponse(response, setResult);
    }
}

async function handleResponse(response, setResult) {
    if (!response || !response.status) {
        return;
    }

    const status = response.status;
    if (status == 200) {
        const result = await response.json();
        setResult(result);
        console.log("Classification successful: ", result);
    } else if (status == 413) {
        console.error("Unsuccessful operation. Image size was too big.");
    } else if (status == 422){
        console.error("Unsuccessful operation. The uploaded file has the wrong extension, it has to be .jpg or .jpeg.");
    } else {
        console.error("Unsuccessful operation by unknown cause.")
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
        return response;

    } catch (error) {
        console.error("Error: ", error);
    }
}