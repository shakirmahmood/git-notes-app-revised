export const createCellData = (value, align, clickHandler) => {
  const cellData = {
    value,
    attributes: {},
  };
  if (align) cellData.attributes.align = align;
  if (clickHandler) cellData.attributes.onClick = clickHandler;
  return cellData;
};
