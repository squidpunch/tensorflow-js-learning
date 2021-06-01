import { useRef } from 'react';

type ImageUploaderProps = {
  onUpload: (image: HTMLImageElement) => void;
};
const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const readFile = (file: File) => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = fr.result as string;
        image.onload = () => onUpload(image);
      };
      fr.readAsDataURL(file);
    });
  };
  const inputRef = useRef(null);

  const handleImage = async (fileInput: HTMLInputElement) => {
    if (fileInput?.files && fileInput?.files?.length > 0) {
      readFile(fileInput.files[0]);
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          (inputRef.current as unknown as HTMLInputElement).click()
        }
      >
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
