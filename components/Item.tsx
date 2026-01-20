import React, { memo } from 'react';
import { LayoutChangeEvent, Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export type ItemProps = {
    onPress?: () => void
    title: string
}
export interface ItemTypeExtended extends ItemProps {
    hasBottomBorder?: boolean
    onLayout?: (event: LayoutChangeEvent) => void
    isSubTitle?: boolean
}

const ItemComponent = ({ onPress, title, onLayout, isSubTitle = true, hasBottomBorder = false }: ItemTypeExtended) => {
    const containerStyle: StyleProp<ViewStyle>[] = [
        isSubTitle ? styles.subContainer : styles.headerContainer,
        hasBottomBorder && styles.bottomBorder
    ];

    const textStyle: StyleProp<TextStyle> = isSubTitle ? styles.subTitle : styles.mainTitle;

    return (
        <View onLayout={onLayout} style={containerStyle}>
            <Pressable onPress={onPress}>
                <Text style={textStyle}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};

export const Item = memo(ItemComponent)

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 18,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fcfcfc',
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBorder: {
        borderBottomWidth: 1,
    },
    mainTitle: { fontSize: 17, fontWeight: '600', color: '#000', letterSpacing: 0.5 },
    subTitle: { fontSize: 15, fontWeight: '500', color: '#555', letterSpacing: 0.2 },
});