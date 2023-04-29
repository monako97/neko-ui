import { toneColor } from '@moneko/common';
import * as libs from '@pkg/index';
import { CodeBlock } from 'neko-ui';
import Box from './box';
import Sandbox, { SandboxGroup } from './sandbox';

export default {
  ...libs,
  CodeBlock,
  Box,
  Sandbox,
  SandboxGroup,
  toneColor,
};
