import { ReactElement } from "react";

export interface Goti {
    shape: ReactElement<any, any>;
    position: number;
    homePosition: number;
    steps: number;
}
