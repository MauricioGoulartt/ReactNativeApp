import * as React from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
} from "native-base";
import api from '../../api'; // Altere esta linha

const Register = () => {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const registerUser = async () => {
    try {
      const response = await api.post('/api/users/', formData); // Altere esta linha
      console.log("Usuário registrado:", response.data);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  };

  const onSubmit = () => {
    validate() ? registerUser() : console.log("Validation Failed");
  };

  const validate = () => {
    const errors = {
      ...(formData.name === undefined ? { name: "Password is required" } : {}),
      ...(formData.email === undefined ? { email: "Name is required" } : {}),
      ...(formData.password === undefined
        ? { password: "Password is required" }
        : {}),
      ...(formData.confirmPassword === undefined
        ? { confirmPassword: "Password is required" }
        : {}),
    };

    setErrors(Object.assign({}, errors));

    return Object.keys(errors).length === 0;
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="indigo.600"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Bem-vindo!
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Cadastre-se para continuar.
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={"name" in errors}>
            <FormControl.Label>Nome</FormControl.Label>
            <Input
              type="text"
              isRequired={true}
              focusOutlineColor="emerald.500"
              onChangeText={(value) =>
                setData({
                  ...formData,
                  name: value,
                })
              }
            />
            {"name" in errors ? (
              <FormControl.ErrorMessage>
                Nome obrigatório.
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={"email" in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="text"
              isRequired={true}
              focusOutlineColor="emerald.500"
              onChangeText={(value) =>
                setData({
                  ...formData,
                  email: value,
                })
              }
            />
            {"email" in errors ? (
              <FormControl.ErrorMessage>
                E-mail obrigatório.
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={"password" in errors}>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              type="password"
              isRequired={true}
              focusOutlineColor="emerald.500"
              onChangeText={(value) =>
                setData({
                  ...formData,
                  password: value,
                })
              }
            />
            {"password" in errors ? (
              <FormControl.ErrorMessage>
                Senha obrigatória.
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={"confirmPassword" in errors}>
            <FormControl.Label>Confirme a senha</FormControl.Label>
            <Input
              type="password"
              isRequired={true}
              focusOutlineColor="emerald.500"
              onChangeText={(value) =>
                setData({
                  ...formData,
                  confirmPassword: value,
                })
              }
            />
            {"confirmPassword" in errors ? (
              <FormControl.ErrorMessage>
                Senha obrigatória.
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={onSubmit}>
            Cadastrar
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Register />
      </Center>
    </NativeBaseProvider>
  );
};
