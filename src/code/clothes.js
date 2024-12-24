export const Category = {
  TOP: "TOP",
  BOTTOM: "BOTTOM",
  BODY: "BODY",
  FOOTWEAR: "FOOTWEAR",
  HEADWEAR: "HEADWEAR",
  ACCESSORY: "ACCESSORY",
  MISC: "MISC",
};

export const Size = {
  XS: 0,
  S: 1,
  M: 2,
  L: 3,
  XL: 4,
  XXL: 5,
};

export class Type {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  }
}

export class Item {
  constructor(type, owner, size) {
    this.type = type;
    this.size = size ? size : owner.size;
    this.owner = owner.name;
  }
}

export const types = [
  // TOPS
  new Type("BLOUSE", Category.TOP),
  new Type("VEST", Category.TOP),
  // BOTTOMS
  new Type("PANTS", Category.BOTTOM),
  new Type("SKIRT", Category.BOTTOM),
  // BODY
  new Type("DRESS", Category.BODY),
  new Type("JUMPSUIT", Category.BODY),
  new Type("ROMPER", Category.BODY),
  // FOOTWEAR
  new Type("SNEAKERS", Category.FOOTWEAR),
  new Type("BOOTS", Category.FOOTWEAR),
  // HEADWEAR
  new Type("BEANIE", Category.HEADWEAR),
  new Type("CAP", Category.HEADWEAR),
  new Type("HAT", Category.HEADWEAR),
  // ACCESSORIES
  new Type("SUNGLASSES", Category.ACCESSORY),
  new Type("RING", Category.ACCESSORY),
  new Type("NECKLACE", Category.ACCESSORY),
  new Type("SOCKS", Category.ACCESSORY),
  new Type("GLOVES", Category.ACCESSORY),
  new Type("SCARF", Category.ACCESSORY),
  // MISC
  new Type("ROBE", Category.MISC),
];
