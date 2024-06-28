// Importación de bibliotecas y componentes necesarios
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';  // Asegúrate de que esta ruta sea correcta

// Definición del componente Login
const Login = ({ navigation }) => {
    // Definición del estado local para almacenar los valores de los campos de entrada
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        // Usar Firebase Authentication para iniciar sesión con el correo y contraseña
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                const user = userCredential.user;
                navigation.replace('Home');
                Alert.alert("Autenticado")
            })
            .catch((error) => {
                // Error al iniciar sesión
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
            });
    };

    const handleCreateAccount = () => {
        // Usar Firebase Authentication para iniciar sesión con el correo y contraseña
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                const user = userCredential.user;
                
                Alert.alert("Cuenta creada correctamente")
            })
            .catch((error) => {
                // Error al iniciar sesión
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
            });
    };

    // Renderiza la interfaz del componente Login
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Registrar cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

// Exporta el componente Login como predeterminado
export default Login;

// Estilos para el componente Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
