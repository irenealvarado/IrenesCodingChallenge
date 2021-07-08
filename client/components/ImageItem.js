import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Text } from 'react-native-elements'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
})

const ImageItem = (props) => {
    const { data } = props
    return (
        <ScrollView style={styles.container}>
            <Card>
                {data.map((imageComment) => (
                    <View>
                        <Image
                            style={styles.image}
                            source={data.map((images) => images.imagePath)}
                        />
                        <Text h5 style={{ padding: 5 }}>
                            {imageComment.imageDescription}
                        </Text>
                        <Card.Divider />
                    </View>
                ))}
            </Card>
        </ScrollView>
    )
}

export default ImageItem
