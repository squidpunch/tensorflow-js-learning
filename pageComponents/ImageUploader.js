import { useRef } from 'react';

const ImageUploader = ({ onUpload }) => {
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = fr.result;
        image.onload = () => onUpload(image);
      };
      fr.readAsDataURL(file);
    });
  };
  const inputRef = useRef(null);

  const handleImage = async (image) => {
    if (image?.files && image?.files?.length > 0) {
      const fileData = await readFile(image.files[0]);
      if (fileData) {
        onUpload(fileData.dataURL);
      }
    }
  };

  return (
    <>
      <button type="button" onClick={() => inputRef.current?.click()}>
        Upload an Image
      </button>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        name="filename"
        multiple={false}
        onChange={(e) => handleImage(e.target)}
        accept="image/*"
      />
    </>
  );
};

export default ImageUploader;
