import * as React from "react";
import {
  Box,
  Heading,
  VStack,
  Center,
  NativeBaseProvider,
  Input,
  Button,
} from "native-base";

export default function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  function handleCadastroPress() {
    navigation.navigate("login");
  }

  function handleSearch() {
    // Lógica de pesquisa aqui
    console.log("Pesquisando por:", searchQuery);
  }

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              color="indigo.600"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Pesquise um livro:
            </Heading>
            <VStack space={3} mt="5">
              <Input
                placeholder="Digite sua pesquisa..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
              <Button onPress={handleSearch} colorScheme="indigo">
                Pesquisar
              </Button>
            </VStack>
          </Box>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}