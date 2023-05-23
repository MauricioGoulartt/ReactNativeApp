import * as React from "react";
import {
  Box,
  View,
  Image,
  Text,
  Stack,
  Center,
  Spacer,
  Button,
} from "native-base";

export default function Profile() {
  return (
    <Center px="3">
      <Center w="100%">
        <View marginTop={10}>
          <Box style={{display: 'flex'}} height={150} width={150}>
            <Image
              rounded="lg"
              height="100%"
              width="100%"
              resizeMode="stretch"
              src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/7914927/man-icon-md.png"
            />
          </Box>
            <Text style={{ color: "#000" }}>Nome: Lucas Matheus</Text>
            <Text style={{ color: "#000" }}>Email: lucas@email.com</Text>
            <Text style={{ color: "#000" }}>Membro desde: 22/05/2023</Text>
            <View marginTop={8}><Button>Alterar usuário</Button></View>
        </View>
      </Center>
    </Center>
  );
};