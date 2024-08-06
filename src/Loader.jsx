import { Flex, Spinner } from "@chakra-ui/react";

function Loader() {
  return (
    <Flex justify="center" align="center" height="100%" width="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}

export default Loader;
