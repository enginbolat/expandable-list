const handleItemPress = () => {
    console.log("Clicked");
};

export const generateData = () => Array.from({ length: 40 }).map((_, index) => ({
    id: `cat-${index}`,
    title: `Category ${index + 1}`,
    items: Array.from({ length: 3 }).map((__, subIndex) => ({
        title: `Sub Title ${index + 1}.${subIndex + 1}`,
        onPress: handleItemPress,
    })),
}));