import { Grid } from "@aws-amplify/ui-react";

const Layout = ({ children }) => {
  return (
    <Grid
      gap="1rem"
      templateRows="auto 1fr"
      height="100%"
      justifyContent="center"
    >
      {children}
    </Grid>
  );
};

export default Layout;
