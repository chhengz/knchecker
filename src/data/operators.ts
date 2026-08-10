// src/data/operators.ts

export type Operator = {
  name: string;
  prefixes: string[];
};

export const operators: Operator[] = [
  {
    name: "Cellcard",
    prefixes: [
      "011",
      "012",
      "014",
      "017",
      "061",
      "076",
      "077",
      "078",
      "085",
      "089",
      "092",
      "095",
      "099",
    ],
  },
  {
    name: "Smart",
    prefixes: [
      "010",
      "015",
      "016",
      "069",
      "070",
      "081",
      "086",
      "087",
      "093",
      "096",
      "098",
    ],
  },
  {
    name: "Metfone",
    prefixes: [
      "031",
      "060",
      "066",
      "067",
      "068",
      "071",
      "088",
      "090",
      "097",
    ],
  },
  {
    name: "qb",
    prefixes: [
      "013",
      "080",
      "083",
      "084",
    ],
  },

  // Add other operators/prefixes here
];