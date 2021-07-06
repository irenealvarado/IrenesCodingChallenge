import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function UploadImagePrompt({ onPress, ...otherProps }) {
    return (
        <View>
            <TouchableOpacity style={styles.promptButton} onPress={onPress}>
                <Text style={styles.promptText}>
                    Click here to add an image
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    promptButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        margin: 20,
    },
    promptText: {
        fontSize: 15,
        alignSelf: 'center',
    },
})
