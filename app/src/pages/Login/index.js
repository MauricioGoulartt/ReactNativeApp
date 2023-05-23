import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Spinner,
  Spacer,
  Alert,
} from "native-base";
import api from '../../api'; // Altere esta linha
import { useState } from "react";

export default function Login({ navigation }) {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isNotConnected, setIsNotConnected] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    validate() ? handleDashboard() : setLoading(false) && setIsNotConnected(true);
  };

  const validate = () => {
    const errors = {
      ...(formData.email === undefined ? { email: 'Name is required' } : {}),
      ...(formData.password === undefined ? { password: 'Password is required' } : {})
    };

    setErrors(Object.assign({}, errors));

    return Object.keys(errors).length === 0;
  };

  async function handleDashboard() {
    try {
      const response = await api.post('/api/users/login', formData);
      console.log('Usuário encontrado:', response.data);
      navigation.navigate('tab');
    } catch (error) {
      setIsNotConnected(true);
      setTimeout(() => {
        setIsNotConnected(false);
      }, 3000);
      // Adicione aqui o tratamento de erro caso o usuário não exista ou a senha esteja incorreta
    } finally {
      setLoading(false);
    }
  }

  function handleCadastroPress() {
    navigation.navigate("register");
  }

  function handleForgotPasswordPress() {
    navigation.navigate('forgot-password')
  }

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="indigo.600"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Bem-vindo de volta!
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Faça o login para continuar!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl isRequired isInvalid={'email' in errors}>
                <FormControl.Label>E-mail</FormControl.Label>
                <Input
                  type="text"
                  focusOutlineColor="emerald.500"
                  onChangeText={value => setData({
                    ...formData,
                    email: value
                  })}
                />
                {
                  'email' in errors
                    ?
                    <FormControl.ErrorMessage>Email obrigatório.</FormControl.ErrorMessage>
                    :
                    <></>
                }
              </FormControl>
              <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  type="password"
                  focusOutlineColor="emerald.500"
                  onChangeText={value => setData({
                    ...formData,
                    password: value
                  })}
                />
                {
                  'password' in errors
                    ?
                    <FormControl.ErrorMessage>Senha obrigatória</FormControl.ErrorMessage>
                    :
                    <></>
                }
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.800",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                  onPress={handleForgotPasswordPress}
                >
                  Esqueceu a senha?
                </Link>
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
                  </> : <Text>Conectar</Text>
                }
              </Button>
              <Spacer />
              {isNotConnected &&
                <Alert w="100%" colorScheme="error" status="error">
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                      <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text>
                          {`Erro ao se conectar! ${errors}`}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Alert>}
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Não tem cadastro?{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.800",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={handleCadastroPress}
                >
                  Cadastre-se
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}
