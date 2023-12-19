export interface IMenuItem {
  selected: boolean;
  element: React.ReactNode;
  onSelect: () => void;
}
