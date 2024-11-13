import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando telas
import SavedPasswords from './src/screens/SavedPasswords';
import { ModalPassword } from './src/components/modal/index';
import { PasswordTipsGame } from './src/screens/PasswordTipsGame'; // Nova tela com dicas e jogo

let charset = "abcdefghijklmnopqrstuvwxyz!@#$%&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Criação do Stack Navigator
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
    const [senhaGerada, setSenhaGerada] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [savedPasswords, setSavedPasswords] = useState([]);

    function gerarSenha() {
        let senha = "";
        for (let i = 0, n = charset.length; i < 10; i++) {
            senha += charset.charAt(Math.floor(Math.random() * n));
        }
        setSenhaGerada(senha);
        setModalVisible(true);
    }

    function salvarSenha() {
        setSavedPasswords((prevPasswords) => {
            const updatePasswords = [...prevPasswords, senhaGerada];
            setModalVisible(false);
            navigation.navigate("SavedPasswords", { savedPasswords: updatePasswords });
            return updatePasswords;
        });
    }

    return (
        <View style={styles.container}>
            <Image source={require('./src/img/logolock.png')} style={styles.logo} />
            <Text style={styles.title}>LockGen</Text>
            <TouchableOpacity style={styles.button} onPress={gerarSenha}>
                <Text style={styles.textButton}>Gerar Senha</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <ModalPassword
                    senha={senhaGerada}
                    handleClose={() => setModalVisible(false)}
                    salvarSenha={salvarSenha}
                />
            </Modal>

            <Text style={styles.senha}>{senhaGerada}</Text>

            {/* Botão para navegação */}
            <TouchableOpacity
                style={[styles.button, styles.buttonNavigate]}
                onPress={() => navigation.navigate('PasswordTipsGame')}
            >
                <Text style={styles.textButton}>Dicas e Jogo</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SavedPasswords" component={SavedPasswords} />
                <Stack.Screen name="PasswordTipsGame" component={PasswordTipsGame} /> {/* Nova tela com dicas e jogo */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#392DE9',
        width: '70%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 6,
    },
    textButton: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    senha: {
        marginTop: 20,
        color: '#333',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonNavigate: {
        backgroundColor: '#ff1493',
    },
});
