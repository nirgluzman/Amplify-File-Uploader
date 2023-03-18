import "./App.css";

import { FileUploader } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App() {
  return (
    <>
      <FileUploader
        accessLevel="public"
        acceptedFileTypes={["image/*"]}
        variation="drop"
      />
    </>
  );
}

export default App;
