import { Alert, AlertIcon } from "@chakra-ui/react";

function Error() {
  return (
    <Alert status="error" mb={4}>
      <AlertIcon />
      City not found!!
    </Alert>
  );
}

export default Error;
