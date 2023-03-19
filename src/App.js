import { useState, useEffect } from "react";

import { Storage } from "@aws-amplify/storage";
import {
  FileUploader,
  Collection,
  withAuthenticator,
  useAuthenticator,
  Button,
} from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import { ImageCard } from "./components/ImageCard";

function App() {
  const [imageKeys, setImageKeys] = useState([]);
  const [images, setImages] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.signOut]);

  const fetchImages = async () => {
    const { results } = await Storage.list(
      "", //  for listing ALL files without prefix
      { level: "private" }
    );
    setImageKeys(results);
    const s3Images = await Promise.all(
      results.map(
        async (image) => await Storage.get(image.key, { level: "private" })
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
        accessLevel="private"
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
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}

export default withAuthenticator(App);
