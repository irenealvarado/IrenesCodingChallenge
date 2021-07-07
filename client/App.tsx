import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Platform } from 'react-native'
import { Formik, useFormik, Field, Form } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import TextInput from './components/TextInput.js'
import UploadImagePrompt from './components/UploadImagePrompt.js'
import Card from './components/Card.js'

// NEED TO DO: rename to something more semantic
interface GetImageInfo {
    imageDescription: string
    imageURL: string
}

type imagePathType = {}

const mockData = [
    {
        imagePath:
            'https://i.picsum.photos/id/881/700/700.jpg?hmac=-JqTJ4_Ped2jYmjiaDgYZOAGzvC0CybCKbROT3GJgZc',
        imageDescription: 'weird text',
    },
    {
        imagePath:
            'https://i.picsum.photos/id/881/700/700.jpg?hmac=-JqTJ4_Ped2jYmjiaDgYZOAGzvC0CybCKbROT3GJgZc',
        imageDescription: 'weird text2',
    },
    {
        imagePath:
            'https://i.picsum.photos/id/881/700/700.jpg?hmac=-JqTJ4_Ped2jYmjiaDgYZOAGzvC0CybCKbROT3GJgZc',
        imageDescription: 'weird text3',
    },
]

export default function App() {
    const [imagePath, setImagePath] = useState('')
    const [data, setData] = useState(null)

    //custom React hook that will return all Formik state and helpers directly
    const { handleBlur, handleChange, handleSubmit, values } = useFormik({
        initialValues: { imageDescription: '', imageURL: '' },
        onSubmit: (values: GetImageInfo) => {
            fetch('http://10.0.2.2:3000/image', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    imageURL: imagePath,
                    imageDescription: `${values.imageDescription}`,
                }),
            })
        },
    })

    //Upload images from library
    const pickImage = async () => {
        const { uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (uri) setImagePath(uri)
    }

    //get access to photos
    useEffect(() => {
        const fetchImage = async () => {
            if (Platform.OS !== 'web') {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (status !== 'granted') {
                    alert(
                        'Sorry, we need camera roll permissions to make this work!'
                    )
                }
            }
        }

        fetchImage()

        return () => {
            setImagePath('')
        }
    }, [])

    //get posts submitted list display
    useEffect(() => {
        fetch('"https://imagehasbeenverified.example.endpoint"')
            .then((res) => res.json())
            .then((data) => setData(data.message))
    }, [])

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    imageDescription: '',
                    imageURL: '',
                }}
                onSubmit={(values) => console.log('values', values)}
            >
                <View style={styles.formContainer}>
                    <UploadImagePrompt onPress={pickImage} />
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
            </Formik>
            <Card data={mockData} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
})
