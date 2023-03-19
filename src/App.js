import { useState, useEffect } from "react";

import { Storage } from "@aws-amplify/storage";
import { FileUploader, Collection } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { ImageCard } from "./components/ImageCard";

function App() {
  const [imageKeys, setImageKeys] = useState([]);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const { results } = await Storage.list(
      "", //  for listing ALL files without prefix
      { level: "public" }
    );
    setImageKeys(results);
    const s3Images = await Promise.all(
      results.map(
        async (image) => await Storage.get(image.key, { level: "public" })
      )
    );
    setImages(s3Images);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onSuccess = () => {
    fetchImages();
  };

  console.log(images);
  return (
    <>
      <FileUploader
        accessLevel="public"
        acceptedFileTypes={["image/*"]}
        variation="drop"
        onSuccess={onSuccess}
      />
      <Collection
        items={images}
        type="grid"
        padding="2rem"
        boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        maxWidth="1100px"
        margin="0 auto"
        justifyContent="center"
        templateColumns={{
          base: "minmax(0, 500px)",
          medium: "repeat(2, minmax(0, 1fr))",
          large: "repeat(3, minmax(0, 1fr))",
        }}
        gap="small"
      >
        {(item, index) => (
          <div key={index}>
            <ImageCard
              key={index}
              imageKeys={imageKeys}
              item={item}
              index={index}
            />
          </div>
        )}
      </Collection>
    </>
  );
}

export default App;
