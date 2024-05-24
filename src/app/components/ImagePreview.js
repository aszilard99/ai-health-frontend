import {Card, CardHeader, CardFooter, Button, CardBody, Image} from "@nextui-org/react";

export default function ImagePreview({image}){
    return (
        <Card
            className="image-preview-card"
        >
            <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src={image}
                width={200}
            />
        </Card>
    )
}