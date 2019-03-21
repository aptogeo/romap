import * as React from 'react';


export interface IRomapChildProps {
    /**
     * Unique id.
     */
    id: string;
}

export class RomapChild<P extends IRomapChildProps, S> extends React.Component<P, S> {
}
