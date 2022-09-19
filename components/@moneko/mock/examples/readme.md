[TOC]

# @moneko/mock

> 在项目启动目录 mock 文件夹下创建mock脚本，达到模拟响应数据的效果

## 函数方式

> (req: RequestFormData, res: Response) => void

```typescript
import type { MockConfiguration } from '@moneko/mock';

const conf: MockConfiguration = {
  'GET /api/account': (req, res) => {
    const resp = {
      success: true,
      message: '请求成功',
      result: {
        inme: '人大',
        effte: '2022/7/1',
      },
    };
    res.status(200).send(resp);
  },
};

module.exports = { default: conf };

```

### 获取Restful Api参数

```typescript
import type { MockConfiguration } from '@moneko/mock';

const conf: MockConfiguration = {
  'GET /api/account/:id': (req, res) => {
    const resp = {
      success: true,
      message: '请求成功',
      result: {
        id: req.params.id,
        csaa: '人额',
        currency: req.params.id,
        effee: '2022/7/1',
      },
    };
    res.status(200).send(resp);
  },
};

module.exports = { default: conf };

```

### 获取POST请求体数据

```typescript
import type { MockConfiguration } from '@moneko/mock';

const conf: MockConfiguration = {
  'POST /api/login_by_username': (req, res) => {
    const resp = {
      status: 200,
      message: '请求成功',
      result: {
        password: req.body.password,
        username: req.body.username,
      },
    };

    res.status(resp.status).send(resp);
  },
};

module.exports = { default: conf };

```

### 模拟上传文件，返回文件base64

```typescript
import type { MockConfiguration } from '@moneko/core';

const conf: MockConfiguration = {
  'POST /api/upload_file': (req, res) => {
    const { files } = req;

    const strBase64 = Buffer.from(files[0].buffer).toString('base64');

    const resp = {
      status: 200,
      message: '上传成功',
      result: 'data:image/jpeg;base64,' + strBase64,
    };

    res.status(resp.status).send(resp);
  },
};

module.exports = { default: conf };

```

### 使用 YApi JSON Schema 生成数据

```typescript
import { yApiSchemaMock } from '@moneko/mock';
import type { MockConfiguration } from '@moneko/mock';

const getYApiOption = (id: string) => {
  return {
    // yapi host
    host: 'http://yapihost',
    // yapi open api token
    token: 'yapi open api token',
    // yapi 接口id
    id,
  };
};

const conf: MockConfiguration = {
  'POST /getids/list':  async (req, res) => {
    const mockData = await yApiSchemaMock(getYApiOption('7610'), {
      result: {
        page: req.body.pageNum,
        itemsPerPage: req.body.pageSize,
        keyword: req.body.keyword,
      },
    });

    res.status(200).send(mockData);
  },
};

module.exports = { default: conf };

```

### 使用 YApi 高级Mock

```typescript
import { yApiMock } from '@moneko/mock';
import type { MockConfiguration, YApiOption } from '@moneko/mock';

const yApi: YApiOption = {
  // yapi host
  host: 'http://yapihost:8080',
  projectId: 143,
  pathRewrite: '^/api/',
};

const conf: MockConfiguration = {
  'POST /api/getids/list':  async (req, res) => {
    // 此时 mockData 将是来自 POST http://yapihost:8080/mock/143/getids/list 响应的数据
    const resp = await yApiMock(req, yApi);

    res.status(200).send(resp);
  },
};

export default conf;

```

## KV方式 `Record<string, any>`

```typescript
import type { MockConfiguration } from '@moneko/mock';

const conf: MockConfiguration = {
  'POST /api/use/fun': {
      status: 200,
      message: '上传成功',
      effectiveDate: '2022/7/1',
  },
};

module.exports = { default: conf };

```
