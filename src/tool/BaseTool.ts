import * as React from 'react';

export interface IBaseToolProps {
  active?: boolean;
  disable?: boolean;
}

export class BaseTool<P extends IBaseToolProps, S> extends React.Component<P, S> {

  public getChildren(): React.ReactNodeArray {
    let children: React.ReactNodeArray = [];
    if (this.props.children) {
      React.Children.map(this.props.children, (child: React.ReactElement<any>, index: number) => {
        React.cloneElement(child, { active: this.props.active, disable: this.props.disable });
        children.push(child);
      });
    }
    return children;
  }
}