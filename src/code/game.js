export const Level = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};

export class Game {
  level;
  constructor(level = Level.EASY) {
    this.level = level;
  }
}
