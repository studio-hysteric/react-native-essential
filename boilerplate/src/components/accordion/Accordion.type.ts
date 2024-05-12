export interface AccordionProps {
  defaultIsOpen?: boolean;
  onExpanded?: TFunction;
  onCollapsed?: TFunction;
  title?: string;
  duration?: number;
  customTrigger?: (isExpanded: boolean) => React.ReactNode;
}
