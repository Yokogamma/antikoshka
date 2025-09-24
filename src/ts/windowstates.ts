export const windowStates = {
  type: {
    plastic: {
      type: { status: 1, selected: 0, options: ["plastic", "wooden", "aluminum"] },
      antikoshka: { status: 1, selected: 0, options: ["standart", "strong"] },
      open: { status: 1, selected: 0, options: ["no", "yes"] },
    },
    wooden: {
      type: { status: 1, selected: 1, options: ["plastic", "wooden", "aluminum"] },
      antikoshka: { status: 1, selected: 0, options: ["standart"] },
      open: { status: 1, selected: 0, options: ["no"] },
    },
    aluminum: {
      type: { status: 1, selected: 2, options: ["plastic", "wooden", "aluminum"] },
      antikoshka: { status: 1, selected: 0, options: ["standart"] },
      open: { status: 1, selected: 0, options: ["no"] },
    },
  },
  antikoshka: {
    standart: {
      type: { status: 1, selected: 0, options: ["plastic", "wooden", "aluminum"] },
      antikoshka: { status: 1, selected: 0, options: ["standart", "strong"] },
      open: { status: 1, selected: 0, options: ["no", "yes"] },
    },
    strong: {
      type: { status: 1, selected: 0, options: ["plastic"] }, // только пластиковое
      antikoshka: { status: 1, selected: 1, options: ["standart", "strong"] },
      open: { status: 1, selected: 0, options: ["no"] },
    },
  },
  open: {
    no: {
      type: { status: 1, selected: 0, options: ["plastic", "wooden", "aluminum"] },
      antikoshka: { status: 1, selected: 0, options: ["standart", "strong"] },
      open: { status: 1, selected: 0, options: ["no", "yes"] },
    },
    yes: {
      type: { status: 1, selected: 0, options: ["plastic"] }, // только пластиковое
      antikoshka: { status: 1, selected: 0, options: ["standart"] },
      open: { status: 1, selected: 1, options: ["no", "yes"] },
    },
  },
};