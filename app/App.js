import React from 'react';
import { NativeBaseProvider } from 'native-base';
import AppNavigation from './src/routes/routes';
import { NavigationContainer } from '@react-navigation/native';
// import axios from 'axios';
import api from './src/api'

export default function App() {
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      console.log('Usuários cadastrados:', response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
