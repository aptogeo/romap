import * as React from 'react';
import { IMapContext } from '../Map';
export declare class MapResizer extends React.Component<{}, {}> {
    static contextTypes: {
        olMap: () => any;
        olGroup: () => any;
    };
    context: IMapContext;
    constructor(props: any);
    updateSize(): void;
    render(): any;
}
