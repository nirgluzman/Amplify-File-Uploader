import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@aws-amplify/ui-react";
import { theme } from "./theme";

import Layout from "./components/Layout";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Layout>
      <App />
    </Layout>
  </ThemeProvider>
);
