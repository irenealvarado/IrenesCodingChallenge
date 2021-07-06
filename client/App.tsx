import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Platform,
    Image,
} from 'react-native'
import { Formik, useFormik, Field, Form } from 'formik'
import TextInput from './components/TextInput.js'
import UploadImagePrompt from './components/UploadImagePrompt.js'
import * as ImagePicker from 'expo-image-picker'

interface Values {
    imageDescription: string
    imageURL: string
}

export default function App() {
    const [image, setImage] = useState(null)

    const { handleChange, handleSubmit, values } = useFormik({
        initialValues: { imageDescription: '', imageURL: '' },
        onSubmit: (values) =>
            alert(
                `imageDescription: ${values.imageDescription}, imageURL: ${values.imageURL}`
            ),
    })

    //get access to photos
    useEffect(() => {
        ;(async () => {
            if (Platform.OS !== 'web') {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (status !== 'granted') {
                    alert(
                        'Sorry, we need camera roll permissions to make this work!'
                    )
                }
            }
        })()
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        // console.log(result)

        if (!result.cancelled) {
            //make post call with image uri
        }
    }

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
                        <UploadImagePrompt onPress={pickImage} />
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 200, height: 200, margin: 10 }}
                            />
                        )}
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
