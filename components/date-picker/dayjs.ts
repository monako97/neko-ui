import dayjs, { extend, locale } from 'dayjs';
import 'dayjs/locale/zh-cn';
import localData from 'dayjs/plugin/localeData';

extend(localData);
locale('zh-cn');

export default dayjs;
