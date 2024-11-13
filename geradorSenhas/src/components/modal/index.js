import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

// Hook de navegação
import { useNavigation } from '@react-navigation/native';

export function ModalPassword({ senha, handleClose, salvarSenha }) {
    const navigation = useNavigation(); // Hook para navegação

    const copyClipboard = () => {
        Clipboard.setStringAsync(senha);
        Toast.show({
            type: 'success',
            text1: 'Senha copiada',
            text2: 'Senha copiada para a área de transferência!',
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha gerada</Text>

                <Pressable style={styles.innerPassword} onPress={copyClipboard}>
                    <Text style={styles.text}>{senha}</Text>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={salvarSenha}>
                        <Text style={styles.buttonSaveText}>Salvar senha</Text>
                    </TouchableOpacity>

                    {/* Botão para ir para a tela de dicas e jogo */}
                    <TouchableOpacity
                        style={[styles.button, styles.buttonInfo]}
                        onPress={() => navigation.navigate('PasswordTipsGame')}
                    >
                        <Text style={styles.buttonInfoText}>Dicas de Senha e Jogo</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(24, 24, 24, 0.6)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: '#fff',
        width: '85%',
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff1493',
        marginBottom: 24,
        textAlign: 'center',
    },
    innerPassword: {
        backgroundColor: '#f0f8ff',
        width: '90%',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#add8e6',
        marginBottom: 20,
    },
    text: {
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonArea: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        marginTop: 14,
        marginBottom: 14,
        padding: 12,
        backgroundColor: '#ffb6c1',
        borderRadius: 8,
    },
    buttonSave: {
        backgroundColor: '#392DE9',
    },
    buttonSaveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonInfo: {
        backgroundColor: '#7b68ee',
    },
    buttonInfoText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
