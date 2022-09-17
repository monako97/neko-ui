import { projectBasicInfo } from '@moneko/core';

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
