import * as React from 'react';
import styled from 'styled-components';
import { romapContext } from '../../RomapContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WmsLoader = () => {
  const [capabilities, setCapabilities] = React.useState<any>(null);

  return (
    <romapContext.Consumer>
      {context => (
        <Container>
          <label htmlFor="url">{context.getLocalizedText('wmsLoader.url', 'Enter WMS URL')}</label>
          <input id="url" type="text"></input>
          <button>{context.getLocalizedText('wmsLoader.load', 'Load capabilities')}</button>
        </Container>
      )}
    </romapContext.Consumer>
  );
};
