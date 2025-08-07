import { Goti } from "@/interface/utils";
import { ReactElement } from "react";

export class Player {
  private gotiArray: Goti[];
  private id: number;

  constructor(
    shape: (isAnimating: boolean) => ReactElement<any, any>,
    homePosition: number
  ) {
    this.gotiArray = new Array(4).fill(null).map((_, index) => ({
      shape: (isAnimating = false) => shape(isAnimating),
      position: homePosition,
      homePosition: homePosition,
      steps: 0,
    }));
    this.id = homePosition;
  }

  getGotiArray() {
    return this.gotiArray;
  }

  setGotiArray(gotiArray: Goti[]) {
    this.gotiArray = gotiArray;
  }

  isHome(index: number) {
    return (
      this.gotiArray[index].position === this.gotiArray[index].homePosition
    );
  }

  setShape(index: number, isAnimating: boolean) {
    this.gotiArray[index].shape = () =>
      this.gotiArray[index].shape(isAnimating);
  }
}
