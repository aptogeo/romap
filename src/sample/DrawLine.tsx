import * as React from 'react';
import styled from 'styled-components';
import { IBaseButtonToolProps, BaseButtonTool } from '../tool';
import { IRomapContext, romapContext } from '../RomapContext';
import { LocalVector } from '../source';
import Draw from 'ol/interaction/Draw';
import GeometryType from 'ol/geom/GeometryType';

const Container = styled.div`
  margin: 2px;
  display: flex;
  flex-direction: column;
`;

// unique global draw interaction
let draw: Draw = null;

export class DrawLine extends BaseButtonTool<IBaseButtonToolProps, any> {
  public static contextType: React.Context<IRomapContext> = romapContext;

  public context: IRomapContext;

  public componentDidUpdate(prevProps: IBaseButtonToolProps, prevState: any, snap: any) {
    if (this.props.activated && !prevProps.activated) {
      const localVectorSource = this.context.layersManager.createAndAddLayerFromSource(
        'LocalVector',
        {},
        { uid: 'drawline_tool_layer', name: 'Line' }
      ) as LocalVector;
      if (draw == null) {
        draw = new Draw({
          source: localVectorSource,
          type: GeometryType.LINE_STRING
        });
        this.context.olMap.addInteraction(draw);
      }
      draw.setActive(true);
    } else {
      if (draw != null) {
        draw.setActive(false);
      }
    }
  }

  public renderTool(): any {
    return <span>Draw line</span>;
  }
}
