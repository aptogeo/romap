import * as React from 'react';
import styled from 'styled-components';
import { IBaseWindowToolProps, BaseWindowTool, IBaseWindowToolState } from './BaseWindowTool';
import { Selector } from './common/Selector';
import { WmsLoader } from './common/WmsLoader';
import { loadKML, loadKMZ, loadZippedShapefile } from '../utils';

const Container = styled.div`
  margin: 2px;
`;

export interface ILayerLoaderProps extends IBaseWindowToolProps {
  /**
   * Class name.
   */
  className?: string;
  /**
   * Fixed GIS proxy url
   */
  gisProxyUrl?: string;
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

  public handleTypeSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    this.setState({
      type: event.currentTarget.value
    });
  };

  public handleFileSelectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file: File = event.currentTarget.files[0];
    switch (this.state.type) {
      case '.kml':
        this.setState({ file });
        loadKML(file, this.context.layersManager);
        break;
      case '.kmz':
        this.setState({ file });
        loadKMZ(file, this.context.layersManager);
        break;
      case '.zip':
        this.setState({ file });
        loadZippedShapefile(file, this.context.layersManager);
        break;
      default:
        break;
    }
    this.setState({ file: null, type: null });
  };

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
              { type: '.zip', description: 'Zipped Shapefile (.zip)', showFileDropZone: true },
              {
                type: 'WMS',
                description: 'Web Map Service',
                content: <WmsLoader gisProxyUrl={this.props.gisProxyUrl} />
              }
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
