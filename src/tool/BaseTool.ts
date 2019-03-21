import * as React from 'react';
import { RomapChild, IRomapChildProps } from '../RomapChild';

export interface IBaseToolProps extends IRomapChildProps {
  /**
   * Unique id.
   */
  id: string;
  /**
   * Active.
   */
  active?: boolean;
  /**
   * Independant.
   */
  independant?: boolean;
  /**
   * Disable.
   */
  disable?: boolean;
}

export class BaseTool<P extends IBaseToolProps, S> extends RomapChild<P, S> {}
