import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { Formik, useFormik, Field, Form } from 'formik'
import TextInput from './components/TextInput.js'
import UploadImagePrompt from './components/UploadImagePrompt.js'

interface Values {
    imageDescription: string
    imageURL: string
}

export default function App() {
    const { handleChange, handleSubmit, values } = useFormik({
        initialValues: { imageDescription: '', imageURL: '' },
        onSubmit: (values) =>
            alert(
                `imageDescription: ${values.imageDescription}, imageURL: ${values.imageURL}`
            ),
    })
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    imageDescription: '',
                    imageURL: '',
                }}
                onSubmit={(values) => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                        <UploadImagePrompt />
                        <TextInput
                            style={styles.description}
                            onChangeText={handleChange('imageDescription')}
                            onBlur={handleBlur('imageDescription')}
                            value={values.imageDescription}
                            editable
                            maxLength={40}
                        />
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
})
