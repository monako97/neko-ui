import { projectBasicInfo } from '@moneko/solid-js';
import { type Location } from '@solidjs/router';
type ProgramInfo = typeof projectBasicInfo.programInfo;

export interface PkgType extends Partial<Omit<ProgramInfo, 'type'>> {
  title: string;
  subtitle: string;
  type?: string;
}

export const projectInfo: PkgType = {
  title: projectBasicInfo.projectName.replace(/-/g, ' '),
  subtitle: projectBasicInfo.programInfo.description,
  ...projectBasicInfo.programInfo,
};

export const prefixCls = projectBasicInfo.providerConfig.prefixCls;
const base = projectBasicInfo.programInfo.routeBaseName;
const prefix = base.length > 1 ? (base.endsWith('/') ? base.length : base.length + 1) : base.length;

export function activeKey(location: Location) {
  return location.pathname.substring(prefix);
}
