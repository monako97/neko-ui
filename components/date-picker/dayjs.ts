import dayjs, { extend, locale } from 'dayjs';
import localData from 'dayjs/plugin/localeData';

import 'dayjs/locale/zh-cn';

extend(localData);
locale('zh-cn');

export default dayjs;
