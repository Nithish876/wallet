import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import CustomInput from '@/components/CustomInput';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';

const SignUpScreen = () => {
  const {user,loading , signup} = useAuth();
  const[email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');

  const handleLogin = async()=>{
    if(email== ''|| password == ''){
      setError("Please fill in all fields")
      return;
    }
    try {
      await signup(email,password);
      router.replace('/(app)/(tabs)')
    } catch (error:any) {
      Alert.alert("Registration Failed ",error.message)
    }
    //TODO:handle firebase logic 

    setError('');

  }

  return (
    <View style={{ padding: 16, flex: 1, justifyContent: 'center' }}>
      <ThemedText style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 32 }}>SignUp</ThemedText>

      <CustomInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        iconName="email"
        errorMessage={error && !email ? 'Email is required' : ''}
      />
      <CustomInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        iconName="lock"
        secureTextEntry
        errorMessage={error && !password ? 'Password is required' : ''}
      />

      <TouchableOpacity
        style={{ backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8 }}
        onPress={handleLogin}
      >
        <ThemedText style={{ textAlign: 'center', color: '#fff', fontSize: 16 }}>SignUp</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Go to SignUp')}>
        <ThemedText style={{ textAlign: 'center', marginTop: 12 }}>
          Already have an account? <TouchableOpacity onPress={()=>router.replace("/(auth)/login")}><ThemedText style={{ color: '#4CAF50' }}>Login</ThemedText></TouchableOpacity>
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

export default SignUpScreen
