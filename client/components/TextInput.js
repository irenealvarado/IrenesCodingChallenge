import React from 'react'
import { TextInput as RNTextInput, View, StyleSheet } from 'react-native'

export default function TextInput({ ...otherProps }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                borderRadius: 8,
                borderWidth: StyleSheet.hairlineWidth,
                padding: 8,
            }}
        >
            <View style={{ flex: 1 }}>
                <RNTextInput
                    placeholder="Add your comment"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="rgba(34, 62, 75, 0.7)"
                    {...otherProps}
                />
            </View>
        </View>
    )
}
