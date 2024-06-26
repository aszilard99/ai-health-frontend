const ONE_MEGABYTE_IN_BYTES = 1048576;

export default async function handleImageUpload(e, setImage, setFileEnter, setResult, setError) {
    e.preventDefault();

    setFileEnter && setFileEnter(false);
    setError(null)

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
        if (file.size > ONE_MEGABYTE_IN_BYTES) {
            setError("Image size is too large, maximum size allowed is 1 Mb.");
            console.error("Image size is too large, maximum size allowed is 1 Mb");
            return;
        }
        const formData = uploadFile(file);
        const response = await sendRequest(formData, setError);
        let noError;
        if (response) {
            noError = await handleResponse(response, setResult, setError);
        }
        if (noError) { 
            setImage(URL.createObjectURL(file));
        }
    }
}

async function handleResponse(response, setResult, setError) {
    
    const status = response.status;
    if (status == 200) {
        const result = await response.json();
        setResult(result);
        console.log("Classification successful: ", result);
        return true;

    } else if (status == 413) {
        setError("Image size is too large, maximum size allowed is 1 Mb.");
        console.error("Image size is too large, maximum size allowed is 1 Mb");
    } else if (status == 415){
        setError("The uploaded image is not grayscale");
        console.error("The uploaded image is not grayscale");
    } else if (status == 422){
        setError("The uploaded image has the wrong extension, it has to be .jpg or .jpeg.");
        console.error("The uploaded image has the wrong extension, it has to be .jpg or .jpeg");
    } else if (status == 472){
        setError("The uploaded image has too small resolution, it has to be atleast 50x50");
        console.error("The uploaded image has too small resolution, it has to be atleast 50x50");
    } else {
        setError("Unsuccessful operation.");
        console.error("Unsuccessful operation by unknown cause");
    }
    return false;
}

export function uploadFile (file) {
    const formData = new FormData();
    formData.append('image', file);

    return formData;
}

export async function sendRequest (formData, setError) {
    try {
        const response = await fetch("http://127.0.0.1:8080/classify", {
            method: "POST",
            body: formData
        });
        return response;

    } catch (error) {
        setError("The servers are unreachable at the moment, please try again later.");
        console.error("The servers are unreachable. Error message: ", error);
    }
}