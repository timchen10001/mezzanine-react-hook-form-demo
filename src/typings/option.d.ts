import { OptionProps as MznOptionProps } from '@mezzanine-ui/react';

export type OptionItemType = Omit<MznOptionProps, 'children'> & { text: string };
export type OptionItemsType = OptionItemType[];

export type OptionItemGroupsType = {
  label: string,
  options: OptionItemsType,
}[];
