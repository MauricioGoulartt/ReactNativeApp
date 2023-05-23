import React from "react";
import books from "../../assets/books/data";
import {
  View,
  Text,
  Heading,
  Center,
  NativeBaseProvider,
  Button,
  Stack,
  Box,
  Container,
  ScrollView,
  VStack,
  Divider,
  Image,
  Link,
  Progress
} from "native-base";

const TopBook = () => {
  return (
    <View>
      <Stack direction="row" alignItems="center">
        <Box height={160} width={110}>
          <Image
            rounded="lg"
            source={{ uri: books[3].img }}
            alt={books[3].nome}
            height="100%"
            width="100%"
            resizeMode="stretch"
          />
        </Box>
          <Box display="flex" direction="row" w="100%" maxW="110">
          <Text mx="2" mb={1} style={{color: "#07D962"}}>{books[3].nome}</Text>
            <Progress
              colorScheme={"violet"}
              value={45}
              mx="2"
              size="sm"
            />
          </Box>
            <Text>30%</Text>
      </Stack>
    </View>
  );
};

const BookList = () => {
  return (
    <ScrollView horizontal>
      <VStack direction="row" justifyContent="center" alignItems="center">
        {books.map((book, index) => (
          <Box
            key={index}
            bg="violet.100"
            shadow={4}
            rounded="lg"
            my={3}
            overflow="hidden"
            height={200}
            width={120}
            m={1}
            p={0}
          >
            <Image
              source={{ uri: book.img }}
              alt={book.nome}
              height={140}
              width="100%"
              resizeMode="cover"
            />
            <Stack p="2">
              <Heading size="md" color="#000">
                {book.nome}
              </Heading>
              <Text fontSize="md" color="gray.500">{book.autor}</Text>
            </Stack>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
};

const Home = () => {
  return (
    <ScrollView style={{ width: "100%" }} mt={8} background="#222226">
      <VStack space="2.5" px="8">
        <Box display="flex" alignItems="center" mb={12} mt={4}>
          <Center
            rounded={15}
            width="100%"
            flex="1"
            bg="indigo.500"
            _text={{
              color: "white",
              fontWeight: "bold",
            }}
            height={180}
            widht={{
              base: "100",
              lg: 250,
            }}
          >
            <Text width={210} fontWeight="bold" mb={20}>
              Olá, qual livro combina com o seu humor atual?
            </Text>
          </Center>
          <Center
            p={4}
            display="flex"
            alignItems="flex-start"
            top="12"
            mt={8}
            position="absolute"
            rounded={15}
            width="92%"
            flex="1"
            bg="white"
            _text={{
              color: "white",
              fontWeight: "bold",
            }}
            height={250}
            widht={{
              base: "100",
              lg: 250,
            }}
          >
            <Text mb={2} fontWeight="bold" pb={1}>
              Lembre-se, você tem um livro não finalizado desde Sex, 09 Mar 2023
            </Text>
            <TopBook />
          </Center>
        </Box>

        <Box
          pt={16}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md" pl="1" pt="12" color="white">
            Recomendações
          </Heading>
          <Link pt="12" pr="3">
            <Text color="#07D962">Ver mais &gt;</Text>
          </Link>
        </Box>

        <BookList />

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md" pl="1" pt="4" color="white">
            Mais lidos
          </Heading>
          <Link pt="5" pr="3">
            <Text color="#07D962">Ver mais &gt;</Text>
          </Link>
        </Box>
        
        <BookList />

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md" pl="1" pt="4" color="white">
            Sua biblioteca
          </Heading>
          <Link textDecoration="none" pt="5" pr="3">
            <Text color="#07D962">Ver mais &gt;</Text>
          </Link>
        </Box>
        <BookList />
      </VStack>
    </ScrollView>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center>
        <Home />
      </Center>
    </NativeBaseProvider>
  );
};
