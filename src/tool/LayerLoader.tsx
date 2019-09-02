import * as React from 'react';
import styled from 'styled-components';
import { IBaseWindowToolProps, BaseWindowTool, IBaseWindowToolState } from './BaseWindowTool';
import { Selector } from './common/Selector';
import { generateUUID } from '../utils';
import { Vector as VectorLayer } from '../layer';
import { LocalVector, ExternalVector } from '../source';
import KML from 'ol/format/KML';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Text from 'ol/style/Text';
import Icon from 'ol/style/Icon';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const fill = new Fill({
    color: 'rgba(255,255,255,0.4)'
});
const stroke = new Stroke({
    color: '#3399CC',
    width: 1.25
});
const styles = [
    new Style({
        image: new Circle({
            fill: fill,
            stroke: stroke,
            radius: 5
        }),
        fill: fill,
        stroke: stroke
    })
];

const Container = styled.div`
  margin: 2px;
`;

export interface ILayerLoaderProps extends IBaseWindowToolProps {
    /**
     * Class name.
     */
    className?: string;
}

export interface ILayerLoaderState extends IBaseWindowToolState {
    /**
     * Type.
     */
    type: string;
    /**
     * File.
     */
    file: File;
}

export class LayerLoader extends BaseWindowTool<ILayerLoaderProps, ILayerLoaderState> {

    constructor(props: ILayerLoaderProps) {
        super(props);
        this.state = {} as Readonly<ILayerLoaderState>;
    }

    public handleTypeSelectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            type: e.currentTarget.value
        })
    }

    public handleFileSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = e.currentTarget.files[0];
        switch (this.state.type) {
            case '.kml, .kmz':
                this.setState({ file });
                this.loadKML(file);
                break;
            default:
                break;
        }
    }

    public loadKML(file: File) {
        const reader = new FileReader();
        reader.onload = () => {
            const kmlString = reader.result as string;
            const kml = new KML();
            const name = `${kml.readName(kmlString)} (${file.name})`;
            const proj = kml.readProjection(kmlString);
            const features: Feature[] = new KML().readFeatures(kmlString, {
                dataProjection: proj,
                featureProjection: this.context.olMap.getView().getProjection()
            }) as Feature[];
            const localVectorSource = new ExternalVector({});
            localVectorSource.addFeatures(features);
            this.context.romapManager.addOrUpdateLayer(VectorLayer, {
                id: generateUUID(),
                source: localVectorSource,
                name
            });
            this.setState({ file: null, type: null });
        };
        reader.readAsText(file);

    }

    public renderHeaderContent(): React.ReactNode {
        const header = this.context.getLocalizedText('layerloader.title', 'Layer loader');
        return <span>{header}</span>;
    }

    public renderOpenButtonContent(): React.ReactNode {
        const button = this.context.getLocalizedText('layerloader.title', 'Layer loader');
        return <span>{button}</span>;
    }

    public renderTool(): any {
        return <Container
            className={`${this.props.className}`}
        >
            {!this.state.file && (
                <Selector
                    selectorTypes={[{ type: ".kml, .kmz", description: "KML (.kml, .kmz)", showFileDropZone: true }]}
                    onFileSelected={this.handleFileSelectorChange}
                    onTypeSelected={this.handleTypeSelectorChange}
                />
            )}
            {this.state.file && (
                <span>Loading...</span>
            )}
        </Container>;
    }
}
