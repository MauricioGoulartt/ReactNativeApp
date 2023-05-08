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
} from "native-base";
import api from '../../api'; // Altere esta linha

// import { tabNavigation } from "../../routes/routes";

export default function Login({ navigation }) {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const onSubmit = () => {
    validate() ? handleDashboard() : console.log('Validation Failed');
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
      console.error('Erro ao fazer login:', error);
      // Adicione aqui o tratamento de erro caso o usuário não exista ou a senha esteja incorreta
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
                Conectar
              </Button>
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
