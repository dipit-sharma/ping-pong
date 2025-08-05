import { Goti } from "@/interface/utils";

export class Player {
    private gotiArray: Goti[];
    private id: number;

    constructor(shape: React.Component, homePosition: number) {
        this.gotiArray = new Array(4).fill(null).map((_, index) => ({
            shape: shape,
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
}