import * as React from 'react';
import { BaseTool, IBaseToolProps } from './BaseTool';
export declare class MapResizer extends BaseTool<IBaseToolProps, {}> {
    static contextType: React.Context<import("../MapContext").IMapContext>;
    constructor(props: {});
    updateSize: () => void;
    render(): React.ReactNode;
}
