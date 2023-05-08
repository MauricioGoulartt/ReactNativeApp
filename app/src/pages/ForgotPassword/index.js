import React, { useState, useEffect } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard
} from 'react-native';

import styles from './styles';

export default function App({ navigation }) {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 170, y: 195 }));

  useEffect(() => {
    // Animações em paralelo
    Animated.parallel([
      // Fornece um modelo de física básico (efeito mola/estilingue)
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20
      }),

      // Anima um valor ao longo do tempo
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200
      })
    ]).start();
  }, []);

  function handleCadastroPress() {
    navigation.navigate('register');
  }

  function handleLoginPress() {
    navigation.navigate('login');
  }

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <Animated.View style={[
          styles.form,
          {
            opacity: opacity,
            transform: [
              {
                translateY: offset.y
              }
            ]
          }
        ]}>

          <Text style={styles.label}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TouchableOpacity style={styles.buttonSubmit}>
            <Text style={styles.submitText}>Enviar código</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text 
              style={styles.subTitle}
              onPress={handleLoginPress}
            >
              Voltar
            </Text>
          </TouchableOpacity>
      
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
};