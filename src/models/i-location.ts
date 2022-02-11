import {Location} from "history";

export interface TLocation  extends  Location{
    state: {
        from: {
            pathname: string;
        };
    }

}