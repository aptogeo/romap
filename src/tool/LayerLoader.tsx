import * as React from 'react';
import styled from 'styled-components';
import { IBaseWindowToolProps, BaseWindowTool, IBaseWindowToolState } from './BaseWindowTool';
import { Selector } from './common/Selector';
import { generateUUID } from '../utils';
import { Vector as VectorLayer } from '../layer';
import { LocalVector, ExternalVector } from '../source';
import KML from 'ol/format/KML';
import Feature from 'ol/Feature';
import * as JSZip from 'jszip';

const kmlFormat = new KML({ extractStyles: true, showPointNames: false });

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
    });
  };

  public handleFileSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.currentTarget.files[0];
    switch (this.state.type) {
      case '.kml':
        this.setState({ file });
        this.loadKML(file);
        break;
      case '.kmz':
        this.setState({ file });
        this.loadKMZ(file);
        break;
      case '.zip':
        this.setState({ file });
        this.loadZippedShapefile(file);
        break;
      default:
        break;
    }
  };

  public loadKML(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const kmlString = reader.result as string;
      const name = `${kmlFormat.readName(kmlString)} (${file.name})`;
      const features: Feature[] = kmlFormat.readFeatures(kmlString, {
        featureProjection: this.context.olMap.getView().getProjection()
      }) as Feature[];
      const localVectorSource = new LocalVector({});
      localVectorSource.addFeatures(features);
      this.context.romapManager.addOrUpdateLayer(generateUUID(), VectorLayer, {
        source: localVectorSource,
        name
      });
      this.setState({ file: null, type: null });
    };
    reader.readAsText(file);
  }

  public loadKMZ(file: File) {
    const zipFile = new JSZip();
    zipFile.loadAsync(file).then(zip => {
      const promises = Object.keys(zip.files).map(name => zip.files[name]).map(entry => entry.async('blob').then(blob => ({
        name: entry.name,
        blob
      })));
      Promise.all(promises).then(elements => {
        const imageElements = elements.filter(element => /\.(jpe?g|png|gif|bmp)$/i.test(element.name));
        const docElement = elements.filter(element => element.name === 'doc.kml').pop();
        const reader = new FileReader();
        reader.onload = () => {
          const kmlString = reader.result as string;
          const name = `${kmlFormat.readName(kmlString)} (${file.name})`;
          const features: Feature[] = kmlFormat.readFeatures(kmlString, {
            featureProjection: this.context.olMap.getView().getProjection()
          }) as Feature[];
          const localVectorSource = new LocalVector({});
          localVectorSource.addFeatures(features);
          this.context.romapManager.addOrUpdateLayer(generateUUID(), VectorLayer, {
            source: localVectorSource,
            name
          });
          this.setState({ file: null, type: null });
        };
        reader.readAsText(docElement.blob);
      })
    });
  }

  public loadZippedShapefile(file: File) {
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
    return (
      <Container className={`${this.props.className}`}>
        {!this.state.file && (
          <Selector
            selectorTypes={[
              { type: '.kml', description: 'KML (.kml)', showFileDropZone: true },
              { type: '.kmz', description: 'KMZ (.kmz)', showFileDropZone: true },
              { type: '.zip', description: 'Zipped Shapefile (.zip)', showFileDropZone: true }
            ]}
            onFileSelected={this.handleFileSelectorChange}
            onTypeSelected={this.handleTypeSelectorChange}
          />
        )}
        {this.state.file && <span>{this.context.getLocalizedText('layerloader.loading', 'Loading...')}</span>}
      </Container>
    );
  }
}
