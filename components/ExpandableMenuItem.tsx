/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Item, ItemProps } from './Item';

export const SPRING_CONFIG = {
    stiffness: 340,
};

export type ExpandableMenuItemProps = {
    title: string;
    items: ItemProps[]
}

const ExpandableMenuItemComponent = ({ title, items, id }: ExpandableMenuItemProps & Record<'id', number>) => {
    const aRef = useAnimatedRef<View>();
    const headerHeight = useSharedValue(56);
    const contentHeight = useSharedValue(0);
    const isExpanded = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        height: headerHeight.value + (isExpanded.value * contentHeight.value),
        overflow: 'hidden',
    }));

    const listStyle = useAnimatedStyle(() => ({
        opacity: isExpanded.value,
        transform: [{ translateY: interpolate(isExpanded.value, [0, 1], [-15, 0]) }],
    }));

    useEffect(() => {
        isExpanded.value = 0;
    }, [id]);

    const toggleMenu = useCallback(() => {
        isExpanded.value = withSpring(isExpanded.value === 0 ? 1 : 0, SPRING_CONFIG);
    }, []);

    const handleHeaderLayout = useCallback((event: LayoutChangeEvent) => {
        headerHeight.value = event.nativeEvent.layout.height;
    }, []);

    const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height;
        if (height > 0 && contentHeight.value === 0) {
            contentHeight.value = height;
        }
    }, []);

    const renderedItems = useMemo(() => {
        return items.map((item: ItemProps, index: number) => (
            <Item
                key={`${id}-sub-${index}`}
                title={item.title}
                onPress={item.onPress}
                hasBottomBorder={index === items.length - 1}
            />
        ));
    }, [items, id]);

    return (
        <Animated.View style={animatedStyle}>
            <Item
                title={title}
                onPress={toggleMenu}
                onLayout={handleHeaderLayout}
                isSubTitle={false}
            />
            <Animated.View ref={aRef} style={listStyle} onLayout={handleContentLayout}>
                {renderedItems}
            </Animated.View>
        </Animated.View>
    );
}

export const ExpandableMenuItem = memo(ExpandableMenuItemComponent)
