import * as React from 'react';
export interface IBaseToolProps {
    active?: boolean;
    disable?: boolean;
}
export declare class BaseTool<P extends IBaseToolProps, S> extends React.Component<P, S> {
    getChildren(): React.ReactNodeArray;
}
