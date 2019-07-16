import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import { IBaseWindowToolProps, BaseWindowTool } from '../tool';
import { IMapContext, mapContext } from '../RomapContext';
import { constructQueryRequestFromPixel, IQueryResponse, IExtended } from '../source';
import { walk } from '../utils';

export class QueryWindow extends BaseWindowTool<IBaseWindowToolProps, any> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public context: IMapContext;

  public constructor(props: IBaseWindowToolProps) {
    super(props);
  }

  public componentDidMount() {
    this.componentDidUpdate();
  }

  public componentDidUpdate() {
    if (this.props.activated) {
      this.context.olMap.on('click', this.handleClick);
    } else {
      this.context.olMap.un('click', this.handleClick);
    }
  }

  public componentWillUnmount() {
    this.context.olMap.un('click', this.handleClick);
  }

  public handleClick = (e: any) => {
    this.setState({ queryResponses: null });
    const queryRequest = constructQueryRequestFromPixel(e.pixel, 2, this.context.olMap);
    const promises: Array<Promise<IQueryResponse>> = [];
    walk(this.context.olMap, (currentOlLayer: OlBaseLayer) => {
      if (currentOlLayer.getVisible() && 'getSource' in currentOlLayer) {
        const source = (currentOlLayer as any).getSource();
        if (source && 'query' in source) {
          promises.push((source as IExtended).query(queryRequest));
        }
      }
      return true;
    });
    Promise.all(promises).then(queryResponses => {
      this.setState({ queryResponses });
    });
  };

  public renderHeaderContent(): React.ReactNode {
    return <span>Query</span>;
  }

  public renderOpenButtonContent(): React.ReactNode {
    return <span>Query</span>;
  }

  public renderTool(): any {
    return (
      <div>
        {this.state && this.state.queryResponse && <div>{JSON.stringify(this.state.queryResponses)}</div>}
        {!this.state || (!this.state.queryResponses && <div>Click on map</div>)}
      </div>
    );
  }
}