import React, { FC, ReactElement } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Text } from 'react-native-elements'
import { nanoid } from 'nanoid/non-secure'
import { IImageItemProps } from '../models/image.ts'

const ImageItem: FC<IImageItemProps> = ({ data }): ReactElement => (
    <ScrollView style={styles.container}>
        <Card>
            {data.map(({ imagePath, imageDescription }) => (
                <View key={nanoid()}>
                    <Image style={styles.image} source={{ uri: imagePath }} />
                    <Text h5 style={{ padding: 5 }}>
                        {imageDescription}
                    </Text>
                    <Card.Divider />
                </View>
            ))}
        </Card>
    </ScrollView>
)

export default ImageItem

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
