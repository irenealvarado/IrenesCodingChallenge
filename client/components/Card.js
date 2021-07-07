import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commentText: {
        color: 'black',
        fontSize: 15,
        padding: 5,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
})

const Card = (props) => {
    const { data } = props
    return (
        <ScrollView style={styles.container}>
            <View>
                {data.map((imageComment) => (
                    <View>
                        <Text style={styles.commentText}>
                            {imageComment.imageDescription}
                        </Text>
                        <Image
                            style={styles.image}
                            source={data.map((images) => images.imagePath)}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default Card
