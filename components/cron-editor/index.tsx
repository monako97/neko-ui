import { classNames } from '@moneko/common';
import React from 'react';
import { getPrefixCls } from '../utils';

export interface CornEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const CornEditor: React.FC<CornEditorProps> = ({ className }) => {
  return <div className={classNames([getPrefixCls(''), className])}>{'CornEditor'}</div>;
};

export default CornEditor;
