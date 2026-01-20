import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';

import { ExpandableMenuItem, ExpandableMenuItemProps } from '@/components/ExpandableMenuItem';
import { generateData } from '@/utils/helper';

export default function TabTwoScreen() {
  const itemsArray = useMemo(() => generateData(), []);

  const renderItem = useCallback(({ index, item }: { index: number, item: ExpandableMenuItemProps }) => (
    <ExpandableMenuItem
      id={index}
      items={item.items}
      title={item.title}
    />
  ), [])

  return (
    <FlashList
      data={itemsArray}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      removeClippedSubviews={true}
      drawDistance={500}
    />
  );
}

