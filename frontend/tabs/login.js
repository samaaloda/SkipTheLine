import React, { useState } from "react";
import { Button, View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');


export default function Login({ login }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");



    const handleClick = async () => {
        const requestOptions = {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password: password })
        };

        try {
            const res = await fetch('http://localhost:4000/login', requestOptions);

            if (res.status !== 200) {
                setError("Invalid login credentials");
            } else {
                const data = await res.json();
                login(data);  
            }
        } catch (error) {
            setError(`An error occurred, please try again.: ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput 
                onChangeText={setUser} 
                value={user} 
                placeholder="Username" 
                style={styles.input}
            />
            <TextInput 
                onChangeText={setPassword} 
                value={password} 
                placeholder="Password" 
                secureTextEntry
                style={styles.input}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Don't have an account? <Text style={styles.link}>Sign up</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: width * 0.05,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: height * 0.05,
        color: '#333',
    },
    input: {
        width: '80%',
        height: height * 0.07,
        marginBottom: height * 0.02,
        paddingLeft: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    button: {
        width: '80%',
        height: height * 0.07,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        fontSize: 14,
    },
    footerText: {
        marginTop: 30,
        fontSize: 16,
        color: '#555',
    },
    link: {
        color: '#007BFF',
        fontWeight: 'bold',
    }
});


