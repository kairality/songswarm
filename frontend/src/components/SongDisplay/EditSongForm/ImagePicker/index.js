import React, {useState, useEffect} from 'react';
import defaultImg from "../../../../images/default_album.png";
import { FileUploader } from 'react-drag-drop-files';



export default function ImagePicker({song, setImgFile}) {
    const [image, setImage] = useState(null);
    const [previewImg, setPreviewImg] = useState(song.imgSrc ?? defaultImg);

    const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

       const typeArea = (
         <span className="fileTypes">
           Accepted Types: {fileTypes.join(", ")}
         </span>
       );

       const dropArea = (
         <div className="dropArea">
           {previewImg ?
             <img src={previewImg} /> :
             <i class="fa-solid fa-file-arrow-up iEmpty"></i>
           }
           <span>Drag & Drop or Click to Select a Cover Image</span>
           {typeArea}
         </div>
       );

       const dropAreaErrored = (
         <div className="dropArea ">
           <i class="fa-solid fa-file-circle-xmark iError"></i>
           <span className="fileError">Unable to upload that file.</span>
           {typeArea}
         </div>
       );

       const [dropChild, setDropChild] = useState(dropArea);


    useEffect(() => {
            const dropAreaFilled = (
              <div className="dropArea">
                {previewImg ? (
                  <img src={previewImg} />
                ) : (
                  <i class="fa-solid fa-file-arrow-up iEmpty"></i>
                )}
              </div>
            );
       if (image) {
            const imgURL = URL.createObjectURL(image);
            setPreviewImg(imgURL);
            setImgFile(image);
            setDropChild(dropAreaFilled);
       }
    },[image, setImgFile, previewImg])


    return (
        <FileUploader
          className="setSongImg"
          children={[dropChild]}
          onTypeError={() => setDropChild(dropAreaErrored)}
          handleChange={(file) => setImage(file)}
          name="imgFile"
          types={fileTypes}
        />
    );
}
