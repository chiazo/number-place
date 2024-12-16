import { Size, types } from "./clothes.js";
import { Person } from "./person.js";
import { ClothingSwap } from "./clothing-swap.js";

const names = [
  // "Michael",
  // "Brandon",
  // "Steven",
  // "Kenneth",
  // "Amy",
  // "Kathleen",
  // "Benjamin",
  // "Jacob",
  // "Justin",
  // "William",
  // "Robert",
  // "Amanda",
  // "Ronald",
  // "Betty",
  // "Nancy",
  // "Michelle",
  // "Deborah",
  // "Ryan",
  // "Patricia",
  // "Nicole",
  // "Samuel",
  "Daniel",
  "Linda",
  "Sarah",
  "Sandra",
  // "Samantha",
  // "Larry",
  // "Joshua",
  // "Timothy",
  // "Brian",
  // "Andrew",
  // "Anna",
  // "Laura",
  // "Joseph",
  // "Kevin",
  // "Pamela",
  // "Christine",
  // "Ashley",
  // "Stephanie",
  // "Nicholas",
  // "Elizabeth",
  // "Rebecca",
  // "Lisa",
  // "Katherine",
  // "Charles",
  // "Melissa",
  // "Emma",
  // "Susan",
  // "Christopher",
  // "Paul",
  // "Scott",
  // "Jeffrey",
  // "Thomas",
  // "James",
  // "Eric",
  // "Emily",
  // "Kimberly",
  // "David",
  // "Edward",
  // "Donald",
  // "Matthew",
  // "George",
  // "Barbara",
  // "Angela",
  // "Mary",
  // "Margaret",
  // "Dorothy",
  // "Jessica",
  // "Donna",
  // "Anthony",
  // "Jason",
  // "Mark",
  // "Jennifer",
  // "Brenda",
  // "Gary",
  // "Cynthia",
  // "Sharon",
  // "Jonathan",
  // "Karen",
  // "John",
  // "Richard",
  // "Carol",
  // "Shirley",
];

const maxItemsToSwap = 10;

let people = [];

names.forEach((n) => {
  let wants = new Set([]);
  let swaps = new Set([]);
  let size = Math.floor(Math.random() * Object.values(Size).length);
  let itemsToWant = Math.floor(Math.random() * maxItemsToSwap) + 1;
  let itemsToSwap = Math.floor(Math.random() * maxItemsToSwap) + 1;

  for (let i = 0; i < itemsToWant; i++) {
    let wantItemIdx = Math.floor(Math.random() * types.length);
    wants.add(types[wantItemIdx].name);
  }

  for (let i = 0; i < itemsToSwap; i++) {
    let swapItemIdx = Math.floor(Math.random() * types.length);
    swaps.add(types[swapItemIdx].name);
  }

  let person = new Person(n, Array.from(wants), Array.from(swaps), size);
  people[people.length] = person;
});

let clothingSwap = new ClothingSwap(people);
clothingSwap.swap();
console.log(
  "Number of Desired Items Brought by Each Person:\n",
  clothingSwap.inclusivityMap
);
console.log(
  `==============================\nSwap Order from 1 to ${people.length}:\n`,
  clothingSwap.people.map((p) => `${p.name} - ${p.ranking}`)
);

console.log(
  "==============================\nFinal Swap Ledger:\n",
  clothingSwap.people.map((p) => {
    return {
      name: p.name,
      size: Object.keys(Size).find((key) => Size[key] === p.size),
      items: p.acquired.map((a) => a.type.name),
    };
  })
);

console.log(
  "==============================\nRemaining Items:\n",
  clothingSwap.itemsList
);
