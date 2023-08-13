import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import localData from 'dayjs/plugin/localeData';

dayjs.extend(localData);
dayjs.locale('zh-cn');

export default dayjs;
