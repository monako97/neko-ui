# Cron 表达式

> Cron表达式

## 规范

```shell
*    *    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |    └ year (*)
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)
```

| 字段         | 必填 | 允许值          | 允许特殊字符 | 备注                   |
| ------------ | ---- | --------------- | ------------ | ---------------------- |
| Seconds      | 是   | 0–59            | \*,-         | 标准实现不支持此字段。 |
| Minutes      | 是   | 0–59            | \*,-         |
| Hours        | 是   | 0–23            | \*,-         |
| Day of month | 是   | 1–31            | \*,-?LW      | ?LW 只有部分软件实现了 |
| Month        | 是   | 1–12 or JAN–DEC | \*,-         |
| Day of week  | 是   | 0–6 or SUN–SAT  | \*,-?L#      | ?L#只有部分软件实现了  |
| Year         | 否   | 1970–2099       | \*,-         | 标准实现不支持此字段。 |