export interface ISnapshot {
    view: ISnapshotView;
    layers: Array<ISnapshotLayer>;
}

export interface ISnapshotView {
    center: [number, number];
    zoom: number;
    projectionCode: string;
}

export interface ISnapshotLayer {
    getSourceTypeName: string;
    getSourceOptions: any;
    props: any;
}

export interface ISnapshotGetter {
    getSnapshot?: () => ISnapshot;
}
