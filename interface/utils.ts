import { ReactElement } from "react";

export interface Goti {
    shape: (isAnimating: boolean) => ReactElement<any, any>;
    position: number;
    homePosition: number;
    steps: number;
}
