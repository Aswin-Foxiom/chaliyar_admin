import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function ImageCrop({ imageFile, onCropped }) {
  const [image, setImage] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    console.log("8888", imageFile[0]);
    if (imageFile[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // set image data URL
      };
      reader.readAsDataURL(imageFile[0]); // read image file
    }
  }, [imageFile]);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      const file = new File([blob], "croppedImage.png", { type: "image/png" });
      onCropped(file); // pass cropped file back to parent component
    }, "image/png");
  };

  return (
    <Cropper
      src={image} // pass the image data URL, not the imageFile
      style={{ height: 400, width: "100%" }}
      initialAspectRatio={1}
      aspectRatio={1}
      guides={false}
      cropBoxResizable={true}
      cropBoxMovable={true}
      responsive={true}
      viewMode={1}
      minContainerWidth={200}
      minContainerHeight={200}
      ref={cropperRef}
    />
  );
}

export default ImageCrop;
