import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, VStack, ScrollView, NativeBaseProvider } from 'native-base';

let book = 'javascript'

const Boooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
      .then((response) => {
        setBooks(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={2}>
          {books.map((book, index) => (
            <Box
              key={index}
              p={5}
              rounded="md"
              bg="primary.300"
            >
              <Text>
                {book.volumeInfo.title}
              </Text>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Boooks;