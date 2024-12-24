export class ClothingSwap {
  constructor(people) {
    this.people = people;
    this.inclusivityMap = {};
    this.broughtWantedItemMap = {};
    this.wantedItemMap = {};
    this.wants = this.setWants(people);
    this.itemsList = this.setItemsList(people);
    this.items = this.setItems();
    this.limitPerPerson = Math.floor(
      this.itemsList.length / this.people.length
    );
  }

  swap() {
    this.prepareSwap();
    this.swapClothes();
  }

  swapClothes() {
    // going in ranked order, swap clothes until complete
    let swapOrder = this.people.sort((a, b) => a.ranking - b.ranking);
    let idx = 0;
    let totalItems = this.itemsList.length;

    // let each person choose 1 item until we've looked through
    // the entire catalogue
    while (idx < totalItems && idx < this.limitPerPerson * this.people.length) {
      let person = swapOrder[idx % this.people.length];
      console.log("debug", this.itemsList);
      console.log("debug", person);
      let availableItems = this.itemsList.filter(
        (i) =>
          i.owner !== person.name &&
          !person.acquired.map((a) => a.type.name).includes(i.type.name) &&
          person.desiredSwaps.map((a) => a.type.name).includes(i.type.name)
      );
      console.log(
        `avail for ${person.name}, size ${person.size}`,
        availableItems
      );
      let hasOptions = person.desiredSwaps > 0;
      let randomItem;

      if (hasOptions) {
        let itemIdx = Math.floor(Math.random() * person.desiredSwaps.length);
        randomItem = person.desiredSwaps[itemIdx];
        person.desiredSwaps.splice(itemIdx, 1);
      } else {
        let itemIdx = Math.floor(Math.random() * availableItems.length);
        randomItem = availableItems[itemIdx];
      }

      if (randomItem) {
        person.acquired[person.acquired.length] = randomItem;

        // remove this random item from the associated global list
        let idxToRemove = this.itemsList.findIndex(
          (i) =>
            i.owner === randomItem.owner && i.type.name === randomItem.type.name
        );
        this.itemsList.splice(idxToRemove, 1);
      }

      idx += 1;
    }
  }

  prepareSwap() {
    this.people.forEach((p) => this.checkAvailability(p));

    Object.entries(this.broughtWantedItemMap).forEach(([k, v]) => {
      let owner = k.split("-")[0];
      if (owner in this.inclusivityMap) {
        this.inclusivityMap[owner] += 1;
      } else {
        this.inclusivityMap[owner] = 1;
      }
    });

    let ranking = {};
    this.people.forEach((p) => {
      ranking[p.name] =
        // prioritize people who (a) have the least options (b) brought the items most
        // desirable to others and (c) brought the most items
        p.availabilityCount /
        (this.inclusivityMap[p.name] || 0 + p.swaps.length);
    });

    let sorted = Object.keys(ranking).sort((a, b) => ranking[a] - ranking[b]);

    this.people.forEach((p) => {
      p.ranking = sorted.indexOf(p.name) + 1;
    });
  }

  checkAvailability(person) {
    // check if there are clothes in this person's size they desire
    let sizes = this.itemsList.filter(
      (i) => person.size <= i.size && i.owner !== person.name
    );
    let desired = sizes.filter((s) => person.wants.includes(s.type));
    // keep track of who brought clothes that are desirable to others

    desired.forEach((d) => {
      let key = `${d.owner}-${d.type.name}`;
      if (d.owner in this.broughtWantedItemMap) {
        var curr = this.broughtWantedItemMap[key];
        this.broughtWantedItemMap[key] = curr + 1;
      } else {
        this.broughtWantedItemMap[key] = 1;
      }
    });

    person.desiredSwaps = desired;
    person.available = desired.length;
  }

  setItemsList(people) {
    let items = people
      .map((p) => p.swaps)
      .reduce((prev, curr) => prev.concat(curr));
    return items;
  }

  setItems() {
    let map = {};
    this.itemsList.forEach((i) => {
      let name = i.type.name;
      if (name in map) {
        var curr = map[name];
        map[name] = curr + 1;
      } else {
        map[name] = 1;
      }
    });
    return map;
  }

  setWants(people) {
    let map = {};
    people.forEach((p) => {
      p.wants.forEach((w) => {
        if (w.name in map) {
          var curr = map[w.name];
          map[w.name] = curr + 1;
        } else {
          map[w.name] = 1;
        }
      });
    });
    return map;
  }
}
