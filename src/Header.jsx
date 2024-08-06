import { Box, Heading } from "@chakra-ui/react";

function Header() {
  return (
    <Box bg="#2C7A7B" w="100%" p={4} borderTopRadius="20px">
      <Heading as="h1" size="lg" color="white" textAlign="center">
        Weather React App
      </Heading>
    </Box>
  );
}

export default Header;
