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
  HStack,
  Alert,
  Text,
  Spacer,
  Spinner,
} from "native-base";
import api from '../../api'; // Altere esta linha
import { useState } from "react";

export default function Register({ navigation }) {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isNotRegistered, setIsNotRegistered] = useState(false);

  const handleToLogin = () => {
    setTimeout(() => {
      navigation.navigate("login");
    }, 1500);
  }

  const registerUser = async () => {
    try {
      const response = await api.post('/api/users/', formData);
      console.log("Usuário registrado:", response.data);
      setIsRegistered(true);
      setIsNotRegistered(false);
      handleToLogin();
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      setIsNotRegistered(true);
      setIsRegistered(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    setLoading(true);
    validate() ? registerUser() : setLoading(false);
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
    <NativeBaseProvider>
      <Center flex={1} px="3">
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
             <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                {
                  loading ? <>
                    <HStack space={2} alignItems="center">
                      <Spinner accessibilityLabel="Loading posts" />
                      <Heading color="primary.200" fontSize="md">
                        <Text>Carregando</Text>
                      </Heading>
                    </HStack>
                  </> : <Text>Cadastrar</Text>
                }
              </Button>
              <Spacer />
            </VStack>
            {isRegistered &&
              <Alert w="100%" colorScheme="success" status="success">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                      <Alert.Icon />
                      <Text>
                        Usuário cadastrado com sucesso!
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>}
            {isNotRegistered &&
              <Alert w="100%" colorScheme="error" status="error">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                      <Alert.Icon />
                      <Text>
                        {`Erro ao registrar usuário${errors}`}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>}
          </Box>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}
