import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Box, Text, Stack, VStack, FlatList, NativeBaseProvider, Heading, Link } from "native-base";
import { useNavigation } from '@react-navigation/native';

const numColumns = 3;
const searchbook = "harry+Potter";
const booksPerPage = 30;

const Boooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0); // Track the current page
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBooks();
    return () => {
      setBooks([]);
      setPage(0);
    };
  }, []);

  const fetchBooks = () => {
    setIsLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchbook}&startIndex=${
        page * booksPerPage
      }&maxResults=${booksPerPage}`)
      .then((response) => {
        const validBooks = response.data.items.filter((item) => item.volumeInfo.imageLinks?.smallThumbnail);
        setBooks((prevBooks) => [...prevBooks, ...validBooks]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const loadMoreBooks = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const truncate = (str, num) => {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  const renderItem = ({ item, index }) => {
    return (
      <Link onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}>
        <Box
          bg="violet.100"
          shadow={4}
          rounded="lg"
          overflow="hidden"
          height={220}
          width={120}
          m={1}
          p={0}
        >
          <Image
            source={{ uri: item.volumeInfo.imageLinks?.smallThumbnail || "" }}
            alt={item.volumeInfo.title}
            height={140}
            width="100%"
            resizeMode="cover"
          />
          <Stack p="2">
            <Heading size="sm" color="#000">
              {truncate(item.volumeInfo.title, 20)}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {item.volumeInfo.authors
                ? truncate(item.volumeInfo.authors.join(", "), 20)
                : "Unknown"}
            </Text>
          </Stack>
        </Box>
      </Link>
    );
  };

  return (
    <NativeBaseProvider>
      <VStack space={4} alignItems="center">
        <Heading size="lg" color="black" mt={20}>
          Favoritos
        </Heading>
        <FlatList
          key={numColumns}
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          onEndReached={loadMoreBooks}
          onEndReachedThreshold={0.5}
        />
      </VStack>
    </NativeBaseProvider>
  );
};

export default Boooks;
