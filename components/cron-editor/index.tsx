import { classNames, getPrefixCls } from '@pkg/utils';
import React from 'react';

export interface CornEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const CornEditor: React.FC<CornEditorProps> = ({ className }) => {
  return <div className={classNames([getPrefixCls(''), className])}>{'CornEditor'}</div>;
};

export default CornEditor;
