import { Size, Item, Category, Type, types } from "./clothes.js";

export class Person {
  constructor(name, wants, swaps, size) {
    this.name = name;
    this.size = size ? size : Size.L;
    this.wants = wants ? wants.map((w) => findType(w.toUpperCase())) : [];
    this.swaps = swaps
      ? swaps.map((s) => new Item(findType(s.toUpperCase()), this, this.size))
      : [];
    this.ranking = 0;
    this.desiredSwaps = [];
    this.acquired = [];
    this.availabilityCount = 0;
  }

  set available(num) {
    this.availabilityCount = num;
  }
}

function findType(name) {
  let result = types.filter((x) => x.name == name);
  return result.length > 0 ? result[0] : new Type(name, Category.MISC);
}
