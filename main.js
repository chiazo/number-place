import { Size } from "./clothes.js";
import { Person } from "./person.js";
import { ClothingSwap } from "./clothing-swap.js";

/***
*  Clothing Swap
*  
*  Inputs:
*  - size of person
*  - number of clothes they brought
*  - how many clothes they brought that are desirable to others
*  
*  Outputs:
*  - order they can pick
*  - number of items they can choose
*  
* Desirable can be a clothing item people wanted, with a weight determined by size inclusivity. Ooolala this algorithm seems fun since it’s the opposite of utilitarianism (most good for most people). So even if only one person benefits from the large item, you still get a higher score because your item ensures they have an option. 
Let’s say you brought a sweater and it’s a size large. That might receive a higher desirable score than the same sweater but a size small 🌝
 */

const chiazo = new Person(
  "Chiazo",
  ["BLOUSE", "VEST", "HAT"],
  ["SNEAKERS", "BOOTS", "BEANIE"],
  Size.M
);
const chidera = new Person(
  "Chidera",
  ["HAT", "JEANS", "COAT"],
  ["SUNGLASSES", "VEST", "HAT"],
  Size.L
);
const chin = new Person(
  "Chin",
  ["SNEAKERS", "VEST", "HAT", "SUNGLASSES"],
  ["BLOUSE", "JEANS", "COAT"],
  Size.M
);

const clothingSwap = new ClothingSwap([chiazo, chidera, chin]);
clothingSwap.swap();
console.log(
  clothingSwap.people
    .map((p) => {
      let acq = p.acquired.map((a) => a.type.name);
      acq.unshift(`New Owner: ${p.name}`);
      return acq;
    })
    .join("\n")
);
