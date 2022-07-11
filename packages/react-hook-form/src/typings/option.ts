export type OptionItemType<ID extends string = string> = {
  id: ID;
  name: string;
};

export type OptionItemsType = OptionItemType[];

export type OptionItemGroupsType = {
  label: string,
  options: OptionItemsType,
}[];
