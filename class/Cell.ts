import { Goti } from "@/interface/utils";

export class Cell {
  private id: number;
  private isSafe: boolean;
  private isHome: boolean;
  private isPath: boolean;
  private homeForPlayerId: number;
  private goties: Goti[];

  constructor(
    id: number,
    isSafe: boolean,
    isHome: boolean,
    isPath: boolean,
    homeForPlayerId: number,
    goties: Goti[]
  ) {
    this.id = id;
    this.isSafe = isSafe;
    this.isHome = isHome;
    this.isPath = isPath;
    this.homeForPlayerId = homeForPlayerId;
    this.goties = goties;
  }

  // Public getter for goties
  getGoties(): Goti[] {
    return this.goties;
  }
}
