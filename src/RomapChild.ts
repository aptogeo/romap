import * as React from 'react';
import { generateUUID } from './utils';

export interface IRomapChildProps {
  /**
   * Id.
   */
  id?: React.Key;
}

export class RomapChild<P extends IRomapChildProps, S> extends React.Component<P, S> {}
