import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

export default function UploadImagePrompt({ onPress, ...otherProps }) {
    return (
        <View>
            <TouchableOpacity style={styles.promptButton} onPress={onPress}>
                <Text h5 style={styles.promptText}>
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
        alignSelf: 'center',
    },
})
