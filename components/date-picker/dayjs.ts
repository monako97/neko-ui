import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import duration from 'dayjs/plugin/duration';
import localData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localData);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export default dayjs;
