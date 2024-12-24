import React from "react";
import { get_simulation } from "../code/simulator";
import { TypeAnimation } from "react-type-animation";

const Simulation = () => {
  const [inclusivity_map, swap_order, swap_ledger, item_list] =
    get_simulation();

  const items_wanted_intro = `Across the ${
    Object.keys(swap_order).length
  } people participating in today's swap... here are the most desired items:\n\n`;
  const items_wanted_list = [
    ...new Set(
      swap_order
        .map((s) => s.desired.map((d) => d.type.name))
        .filter((i) => i.length > 0)
        .join(",")
        .split(",")
    ),
  ].map(
    (i) => `${i.slice(-1) === "S" && i.slice(-2) !== "SS" ? "some" : "a"} ${i}`
  );
  const items_wanted = `${items_wanted_intro} 
    ${items_wanted_list.slice(0, -1).join(", ")} and ${items_wanted_list.slice(
    -1
  )}.`;

  const desirable_items_intro = `Across the ${
    Object.keys(swap_order).length
  } people participating in today's swap... here's what each person brought:\n\n`;
  const desirable_items =
    desirable_items_intro +
    Object.keys(inclusivity_map)
      .sort((a, b) => inclusivity_map[b] - inclusivity_map[a])
      .map((name) => {
        const ledger = swap_ledger.find((x) => x.name === name);
        const desired = inclusivity_map[name];
        const undesired = ledger.items.length - desired;
        const undesired_description =
          undesired > 0
            ? ` and ${undesired} that w${undesired > 1 ? "ere" : "as"}n't`
            : "";
        return ` - ${name} (size ${ledger.size}) brought ${desired} item${
          desired > 1 ? "s" : ""
        } desired by others${undesired_description}.\n`;
      })
      .join("");

  const swap_order_intro = `Here is the order in which people can swap their clothes:\n\n`;
  const swap_order_list =
    swap_order_intro +
    swap_order
      .sort((a, b) => a.ranking - b.ranking)
      .map((item) => ` - ${item.name} is #${item.ranking}.\n`)
      .join("");

  const swap_results_intro = `Done!! Here are the results of the swap:\n\n`;
  const swap_results =
    swap_results_intro +
    swap_order
      .map((s) => {
        let acquired_list = s.acquired.map(
          (a) =>
            `${
              a.type.name.slice(-1) === "S" && a.type.name.slice(-2) !== "SS"
                ? "some"
                : "a"
            } ${a.type.name}`
        );

        return ` - ${s.name} left with ${s.acquired.length} item${
          s.acquired.length !== 1 ? "s" : ""
        }${
          s.acquired.length > 1
            ? ` - ${acquired_list
                .slice(0, -1)
                .join(", ")} and ${acquired_list.slice(-1)}.`
            : s.acquired.length > 0
            ? ` - ${acquired_list[0]}.`
            : "."
        }\n`;
      })
      .join("\n");

  return (
    <div className="simulation">
      <TypeAnimation
        sequence={[
          items_wanted_intro,
          100,
          items_wanted,
          1000,
          desirable_items_intro,
          1000,
          desirable_items,
          100,
          swap_order_intro,
          1000,
          swap_order_list,
          100,
          "LET THE SWAP BEGIN...!",
          1000,
          "LET THE SWAP BEGIN... THE SWAP IS IN PROGRESS....!",
          1000,
          "LET THE SWAP BEGIN... THE SWAP IS IN PROGRESS....CLOTHES ARE BEING EXCHANGED!",
          1000,
          swap_results_intro,
          100,
          swap_results,
          100,
          item_list.length > 0
            ? `Here ${item_list.length > 1 ? "are" : "is"} the ${
                item_list.length
              } item${
                item_list.length > 0 ? "s" : ""
              } that no one wanted or swapped:\n\n${item_list
                .map(
                  (i) =>
                    `${
                      i.type.name.slice(-1) === "S" &&
                      i.type.name.slice(-2) !== "SS"
                        ? "some"
                        : "a"
                    } ${i.type.name}`
                )
                .join(", ")}\n\n${
                item_list.length > 1 ? "They" : "It"
              }'ll be donated!`
            : `All items were swapped! Thanks for participating :)`,
          1000,
        ]}
        omitDeletionAnimation={true}
        style={{ whiteSpace: "pre-line" }}
      />
    </div>
  );
};

export default Simulation;
