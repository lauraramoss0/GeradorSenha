import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export function PasswordTipsGame() {
    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);

    const questions = [
        {
            question: "Qual é a melhor prática para criar uma senha segura?",
            options: ["Usar seu nome", "Usar uma palavra fácil", "Misturar letras, números e caracteres especiais"],
            answer: 2,
        },
        {
            question: "Quantos caracteres uma senha segura deve ter?",
            options: ["8", "10", "12 ou mais"],
            answer: 2,
        },
        {
            question: "Você deve compartilhar sua senha com amigos?",
            options: ["Sim", "Não", "Depende"],
            answer: 1,
        },
    ];

    const handleAnswer = (selectedAnswer) => {
        if (selectedAnswer === questions[questionIndex].answer) {
            setScore(score + 1);
        }

        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            Alert.alert('Fim do Jogo', `Você acertou ${score} de ${questions.length} perguntas.`);
            setScore(0);  // Reseta a pontuação
            setQuestionIndex(0);  // Reseta a pergunta
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dicas de Senha</Text>
            <Text style={styles.info}>
                Crie senhas seguras combinando letras, números e caracteres especiais. Não use dados pessoais.
            </Text>

            <Text style={styles.title}>Jogo de Segurança de Senha</Text>

            <Text style={styles.question}>{questions[questionIndex].question}</Text>

            {questions[questionIndex].options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleAnswer(index)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff1493',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#392DE9',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        backgroundColor: '#ffb6c1',
        padding: 12,
        margin: 5,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
