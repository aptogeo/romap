import * as React from 'react';
import styled from 'styled-components';
import { romapContext } from '../../RomapContext';
import WMSCapabilities from 'ol/format/WMSCapabilities';
import { send, IResponse } from 'bhreq';
import { toByteArray as b64encode } from 'base64-js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LayerContainer = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  list-style: none;
  padding: 0;
`;

const parser = new WMSCapabilities();

export const WmsLoader = () => {
  const [capabilities, setCapabilities] = React.useState<any>(null);
  const [url, setUrl] = React.useState<string>('');
  const [gisProxyUrl, setGisProxyUrl] = React.useState<string>('');
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleUrlChange = (event: any) => {
    setUrl(event.currentTarget.value);
  };

  const handleGisProxyUrlChange = (event: any) => {
    setGisProxyUrl(event.currentTarget.value);
  };

  const handleButtonClick = (event: any) => {
    let capUrl = url;
    if (gisProxyUrl !== '') {
      capUrl = `${gisProxyUrl}/${btoa(url)
        .replace('=', '%3D')
        .replace('/', '%2F')
        .replace('+', '%2B')}?service=WMS&version=1.3.0&request=GetCapabilities`;
    }
    return send({ url: capUrl }).then((response: IResponse) => {
      setCapabilities(parser.read(response.body));
    });
  };

  const handleCheckboxChange = (name: string) => (e: any) => {
    if (e.currentTarget.checked === true) {
      setSelected(selected.concat([name]));
    } else {
      setSelected(selected.splice(selected.indexOf(name), 1));
    }
  };

  const handleAddButtonClick = (event: any) => {};

  return (
    <romapContext.Consumer>
      {context => (
        <Container>
          {capabilities == null && (
            <React.Fragment>
              <label htmlFor="url">
                {context.getLocalizedText(
                  'wmsLoader.url',
                  'Enter WMS URL (required, example: http://172.20.0.3:8080/geoserver/wms)'
                )}
              </label>
              <input id="url" type="text" value={url} onChange={handleUrlChange}></input>
              <label htmlFor="gisProxyUrl">
                {context.getLocalizedText(
                  'wmsLoader.gisProxyUrl',
                  'Enter Gis Proxy URL (optional, example: http://localhost:8181)'
                )}
              </label>
              <input id="gisProxyUrl" type="text" value={gisProxyUrl} onChange={handleGisProxyUrlChange}></input>
              <button onClick={handleButtonClick}>
                {context.getLocalizedText('wmsLoader.load', 'Load capabilities')}
              </button>
            </React.Fragment>
          )}
          {capabilities != null && (
            <React.Fragment>
              <LayerContainer>
                {capabilities.Capability.Layer.Layer.map((layer: any) => {
                  return (
                    <li>
                      <input
                        key={layer.Name}
                        id={layer.Name}
                        type="checkbox"
                        onChange={handleCheckboxChange(layer.Name)}
                        checked={selected.indexOf(layer.Name) >= 0}
                      />
                      <label htmlFor={layer.Name}>{layer.Name}</label>
                    </li>
                  );
                })}
              </LayerContainer>
              <button onClick={handleAddButtonClick}>
                {context.getLocalizedText('wmsLoader.add', 'Add selected')}
              </button>
            </React.Fragment>
          )}
        </Container>
      )}
    </romapContext.Consumer>
  );
};
