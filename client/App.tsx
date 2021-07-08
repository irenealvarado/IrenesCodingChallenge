import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { useFormik } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import TextInput from './components/TextInput.js'
import UploadImagePrompt from './components/UploadImagePrompt.js'
import ImageItem from './components/ImageItem.js'
import { Button } from 'react-native-elements'
import { IImageItemProps } from './models/image.ts'
import axios from 'axios'
import { apiBaseUrl, apiEndpoints } from './constants/constants.js'
import { mockData } from './imageApiHelpers/mockData.js'

export default function App() {
    const [imagePath, setImagePath] = useState('')
    const [data, setData] = useState(mockData)

    //custom React hook that will return all Formik state and helpers directly
    const { handleBlur, handleChange, handleSubmit, values } = useFormik({
        initialValues: { imageComment: '' },
        onSubmit: async (values: IImageItemProps) => {
            // Simple UI validation
            // TODO: migrate to formik + yup validation
            if (!values.imageComment || !imagePath)
                return alert('Missing comment or image')
            // TODO: use 10.0.2.2 when making this work for Android

            // TODO: Abstract this into a new component, one for all axios calls
            try {
                await axios.post(`${apiBaseUrl}/${apiEndpoints.image}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: {
                        imageURL: imagePath,
                        imageComment: `${values.imageComment}`,
                    },
                })
            } catch (error) {
                console.error(error)
            }
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
            // reset states to default valuesclean up for component unmount
            setImagePath('')
        }
    }, [])

    useEffect(() => {
        // TODO: fetch data from backend endpoint called getImage
        return () => {}
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <UploadImagePrompt onPress={pickImage} />
                <TextInput
                    style={styles.description}
                    onChangeText={handleChange('imageComment')}
                    onBlur={handleBlur('imageComment')}
                    value={values.imageComment}
                    editable
                    maxLength={30}
                />
                <Button
                    title="Submit"
                    type="solid"
                    onPress={handleSubmit}
                    style={{ margin: 20 }}
                />
            </View>
            <ImageItem data={mockData} />
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
