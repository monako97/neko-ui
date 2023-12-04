---
title: 渲染JSON Schema结构
description: 通过设置 `fromSchema` 属性渲染来支持 `JSONSchema` 的数据源。
order: 5
---

```html
<n-tree from-schema="true"></n-tree>
<script>
  const el = container.querySelector('n-tree');
  el.onchange = function (e) {
    const [key, item] = e.detail;
  
    el.value = key;
    console.log(item);
  };
  el.data = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "http://example.com/example.json",
  "type": "object",
  "additionalProperties": true,
  "properties": {
    "sendChannels": {
      "type": "string",
      "title": "发送渠道",
      "description": ""
    },
    "sendDate": {
      "type": "string",
      "title": "年月日",
      "description": ""
    },
    "sendTime": {
      "type": "string",
      "title": "时分秒",
      "description": ""
    },
    "glblSeqNo": {
      "type": "string",
      "title": "全局流水号",
      "description": ""
    },
    "beMergData": {
      "type": "object",
      "title": "(对公)被合并客户信息",
      "description": "",
      "additionalProperties": true,
      "properties": {
        "actlCurrCd": {
          "type": "string",
          "title": "(对公)实收资本币别",
          "description": ""
        },
        "actlRecvCap": {
          "type": "number",
          "title": "(对公)实收资本",
          "description": ""
        },
        "agrcltRelatedCustInd": {
          "type": "string",
          "title": "(对公)涉农客户标志",
          "description": ""
        },
        "bankCode": {
          "type": "string",
          "title": "(对公)法人代码",
          "description": ""
        },
        "basicAcctAuthCertNum": {
          "type": "string",
          "title": "(对公)开户许可证号",
          "description": ""
        },
        "basicAcctAuthMatureDt": {
          "type": "string",
          "title": "(对公)基本户开户许可证到期日期",
          "description": ""
        },
        "basicAcctNum": {
          "type": "string",
          "title": "(对公)基本账户账号",
          "description": ""
        },
        "basicAcctOpenBankName": {
          "type": "string",
          "title": "(对公)基本账户开户行名称",
          "description": ""
        },
        "belongIndusCd": {
          "type": "string",
          "title": "(对公)所属行业",
          "description": ""
        },
        "corpBizIn": {
          "type": "number",
          "title": "(对公)上年营业收入",
          "description": ""
        },
        "corpEmplyPersonCnt": {
          "type": "integer",
          "title": "(对公)上年末企业从业人员",
          "description": ""
        },
        "corpFoundDt": {
          "type": "string",
          "title": "(对公)企业成立日期",
          "description": ""
        },
        "corpOperStatCd": {
          "type": "string",
          "title": "(对公)经营状态",
          "description": ""
        },
        "corpSizeCd": {
          "type": "string",
          "title": "(对公)企业规模",
          "description": ""
        },
        "corpTotalAsset": {
          "type": "number",
          "title": "(对公)上年末资产总额",
          "description": ""
        },
        "corpTypeCd": {
          "type": "string",
          "title": "(对公)企业类型",
          "description": ""
        },
        "custDataIntactInd": {
          "type": "string",
          "title": "(对公)客户资料是否完整",
          "description": ""
        },
        "custEnName": {
          "type": "string",
          "title": "(对公)英文名称",
          "description": ""
        },
        "custName": {
          "type": "string",
          "title": "(对公)客户名称",
          "description": ""
        },
        "custNum": {
          "type": "string",
          "title": "(对公)客户编号",
          "description": ""
        },
        "custStatusCd": {
          "type": "string",
          "title": "(对公)客户状态",
          "description": ""
        },
        "custTypeCd": {
          "type": "string",
          "title": "(对公)客户类型",
          "description": ""
        },
        "depPsnCate": {
          "type": "string",
          "title": "(对公)存款人类别",
          "description": ""
        },
        "ecomnCompntCd": {
          "type": "string",
          "title": "(对公)经济成分",
          "description": ""
        },
        "econTypeCd": {
          "type": "string",
          "title": "(对公)经济类型",
          "description": ""
        },
        "finOrgCustCd": {
          "type": "string",
          "title": "(对公)同业客户类型",
          "description": ""
        },
        "finOrgIndusCd": {
          "type": "string",
          "title": "(对公)金融机构行业分类",
          "description": ""
        },
        "firstLoanDt": {
          "type": "string",
          "title": "(对公)首贷时间",
          "description": ""
        },
        "forgnInduCorpCd": {
          "type": "string",
          "title": "(对公)外汇企业属性",
          "description": ""
        },
        "greenCorpInd": {
          "type": "string",
          "title": "(对公)是否绿色企业",
          "description": ""
        },
        "groupCustInd": {
          "type": "string",
          "title": "(对公)是否集团客户",
          "description": ""
        },
        "indvBizInd": {
          "type": "string",
          "title": "(对公)个体工商户标志",
          "description": ""
        },
        "issuerInd": {
          "type": "string",
          "title": "(对公)发行人标志",
          "description": ""
        },
        "listCorpInd": {
          "type": "string",
          "title": "(对公)上市公司标志",
          "description": ""
        },
        "loanCardNum": {
          "type": "string",
          "title": "(对公)贷款卡编号",
          "description": ""
        },
        "locaCtyZoneCd": {
          "type": "string",
          "title": "(对公)所在国家和地区",
          "description": ""
        },
        "memoTxt": {
          "type": "string",
          "title": "(对公)备注",
          "description": ""
        },
        "merchtInd": {
          "type": "string",
          "title": "(对公)是否商户",
          "description": ""
        },
        "nationEcoDeptCd": {
          "type": "string",
          "title": "(对公)国民经济部门",
          "description": ""
        },
        "operBiz": {
          "type": "string",
          "title": "(对公)经营范围",
          "description": ""
        },
        "orgCateCd": {
          "type": "string",
          "title": "(对公)组织机构类别",
          "description": ""
        },
        "oversInd": {
          "type": "string",
          "title": "(对公)境内境外标志",
          "description": ""
        },
        "pbcFinOrgCd": {
          "type": "string",
          "title": "(对公)人行金融机构编码",
          "description": ""
        },
        "rgstCap": {
          "type": "number",
          "title": "(对公)注册资本",
          "description": ""
        },
        "rgstCurrCd": {
          "type": "string",
          "title": "(对公)注册资本币别",
          "description": ""
        },
        "techCorpInd": {
          "type": "string",
          "title": "(对公)是否科技企业",
          "description": ""
        },
        "unitCharCd": {
          "type": "string",
          "title": "(对公)单位性质",
          "description": ""
        },
        "cstInfoStatus": {
          "type": "string",
          "title": "客户信息异常标识",
          "description": ""
        },
        "sourceSys": {
          "type": "string",
          "title": "源系统标识",
          "description": ""
        },
        "isPotential": {
          "type": "string",
          "title": "潜客标识",
          "description": ""
        },
        "custTypeCdSub": {
          "type": "string",
          "title": "客户类型细分",
          "description": ""
        },
        "netAsset": {
          "type": "number",
          "title": "净资产",
          "description": ""
        },
        "agrcltRelatedScope": {
          "type": "string",
          "title": "涉农范围",
          "description": ""
        },
        "custMgrNum": {
          "type": "string",
          "title": "(对公)客户经理编号",
          "description": ""
        },
        "macctAvg": {
          "type": "number",
          "title": "(对公)月日均",
          "description": ""
        },
        "cacctAvg": {
          "type": "number",
          "title": "(对公)年日均",
          "description": ""
        },
        "grade": {
          "type": "string",
          "title": "(对公)客户等级",
          "description": ""
        },
        "natureFunds": {
          "type": "string",
          "title": "(对公)资金性质",
          "description": ""
        },
        "basicAcctOpenBankCode": {
          "type": "string",
          "title": "(对公)基本账户开户行行号",
          "description": ""
        },
        "swiftCode": {
          "type": "string",
          "title": "(对公)银行国际代码",
          "description": ""
        },
        "basicAcctnRegionCode": {
          "type": "string",
          "title": "(对公)基本存款账户开户地区代码",
          "description": ""
        },
        "mergeCustNum": {
          "type": "string",
          "title": "(对公)合并客户号",
          "description": ""
        },
        "certificates": {
          "type": "array",
          "title": "(对公)证件类型数组",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "certCustName": {
                "type": "string",
                "title": "(对公)证件名称",
                "description": ""
              },
              "certEffectDt": {
                "type": "string",
                "title": "(对公)证件生效日期",
                "description": ""
              },
              "certInvalidDt": {
                "type": "string",
                "title": "(对公)证件失效日期",
                "description": ""
              },
              "certIssueOrgName": {
                "type": "string",
                "title": "(对公)证件签发机关名称",
                "description": ""
              },
              "certNum": {
                "type": "string",
                "title": "(对公)证件号码",
                "description": ""
              },
              "certTypeCd": {
                "type": "string",
                "title": "(对公)证件类型",
                "description": ""
              },
              "recntYearCheckDt": {
                "type": "string",
                "title": "(对公)最近一次年检日期",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "idtfyCheckInd": {
                "type": "string",
                "title": "(对公)联网核查情况",
                "description": ""
              },
              "isExpCer": {
                "type": "string",
                "title": "(对公)证件是否到期",
                "description": ""
              },
              "majorCertInd": {
                "type": "string",
                "title": "(对公)主证件标志",
                "description": ""
              },
              "recdStatus": {
                "type": "string",
                "title": "(对公)记录状态",
                "description": ""
              },
              "certIssueOrgRegionCode": {
                "type": "string",
                "title": "(对公)证件签发机关地区码",
                "description": ""
              }
            }
          }
        },
        "contactAddrs": {
          "type": "array",
          "title": "(对公)地址信息",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "addrInfo": {
                "type": "string",
                "title": "(对公)详细地址",
                "description": ""
              },
              "addrTypeCd": {
                "type": "string",
                "title": "(对公)地址类型",
                "description": ""
              },
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "ctyZoneCd": {
                "type": "string",
                "title": "(对公)国家和地区",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "provCd": {
                "type": "string",
                "title": "(对公)省",
                "description": ""
              },
              "cityCd": {
                "type": "string",
                "title": "(对公)市",
                "description": ""
              },
              "countyCd": {
                "type": "string",
                "title": "(对公)县",
                "description": ""
              },
              "majorInd": {
                "type": "string",
                "title": "(对公)主要标志",
                "description": ""
              },
              "postCode": {
                "type": "string",
                "title": "(对公)邮政编码",
                "description": ""
              },
              "recdStatus": {
                "type": "string",
                "title": "(对公)记录状态",
                "description": ""
              }
            }
          }
        },
        "contacts": {
          "type": "array",
          "title": "(对公)联系信息",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "contInfo": {
                "type": "string",
                "title": "(对公)联系信息",
                "description": ""
              },
              "contTypeCd": {
                "type": "string",
                "title": "(对公)联系类型",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "majorInd": {
                "type": "string",
                "title": "(对公)主要标志",
                "description": ""
              },
              "recdStatus": {
                "type": "string",
                "title": "(对公)记录状态",
                "description": ""
              },
              "isPhoneTrilateral": {
                "type": "string",
                "title": "(对公)手机号三方查验标志",
                "description": ""
              },
              "atchRltnpTp": {
                "type": "string",
                "title": "(对公)归属关系",
                "description": ""
              },
              "memoTxt": {
                "type": "string",
                "title": "(对公)备注",
                "description": ""
              }
            }
          }
        },
        "entpAndEntps": {
          "type": "array",
          "title": "(对公)单位与单位关系",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "actlInvestAmt": {
                "type": "number",
                "title": "(对公)实际出资金额",
                "description": ""
              },
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "relaCertType": {
                "type": "string",
                "title": "(对公)关系客户证件类型",
                "description": ""
              },
              "relaCertNum": {
                "type": "string",
                "title": "(对公)关系客户证件号码",
                "description": ""
              },
              "relaCertInvalidDt": {
                "type": "string",
                "title": "(对公)关系客户证件失效日期",
                "description": ""
              },
              "custName": {
                "type": "string",
                "title": "(对公)客户名称",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "holdStockCnt": {
                "type": "string",
                "title": "(对公)持股情况",
                "description": ""
              },
              "investCurrCd": {
                "type": "string",
                "title": "(对公)出资币种",
                "description": ""
              },
              "investRatio": {
                "type": "number",
                "title": "(对公)出资比例",
                "description": ""
              },
              "memoTxt": {
                "type": "string",
                "title": "(对公)备注",
                "description": ""
              },
              "oughtInvestAmt": {
                "type": "number",
                "title": "(对公)应出资金额",
                "description": ""
              },
              "relaCustNum": {
                "type": "string",
                "title": "(对公)关系客户编号",
                "description": ""
              },
              "relaType": {
                "type": "string",
                "title": "(对公)关系类型",
                "description": ""
              },
              "relaExpiresDate": {
                "type": "string",
                "title": "(对公)关系到期时间",
                "description": ""
              },
              "addrTypeCd": {
                "type": "string",
                "title": "(对公)地址类型",
                "description": ""
              },
              "addrInfo": {
                "type": "string",
                "title": "(对公)详细地址",
                "description": ""
              }
            }
          }
        },
        "entpAndPrsns": {
          "type": "array",
          "title": "(对公)单位与个人关系",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "actlInvestAmt": {
                "type": "number",
                "title": "(对公)实际出资金额",
                "description": ""
              },
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "certTypeCd": {
                "type": "string",
                "title": "(对公)证件类型",
                "description": ""
              },
              "custName": {
                "type": "string",
                "title": "(对公)客户名称",
                "description": ""
              },
              "entpCustNum": {
                "type": "string",
                "title": "(对公)对公客户编号",
                "description": ""
              },
              "holdPos": {
                "type": "string",
                "title": "(对公)担任职务",
                "description": ""
              },
              "holdPosDt": {
                "type": "string",
                "title": "(对公)担任该职务时间",
                "description": ""
              },
              "holdStockCnt": {
                "type": "string",
                "title": "(对公)持股情况",
                "description": ""
              },
              "indusWorkYears": {
                "type": "integer",
                "title": "(对公)相关行业从业年限",
                "description": ""
              },
              "investCurrCd": {
                "type": "string",
                "title": "(对公)出资币种",
                "description": ""
              },
              "investDate": {
                "type": "string",
                "title": "(对公)出资日期",
                "description": ""
              },
              "investRatio": {
                "type": "number",
                "title": "(对公)出资比例",
                "description": ""
              },
              "investType": {
                "type": "string",
                "title": "(对公)出资方式",
                "description": ""
              },
              "memoTxt": {
                "type": "string",
                "title": "(对公)备注",
                "description": ""
              },
              "oughtInvestAmt": {
                "type": "number",
                "title": "(对公)应出资金额",
                "description": ""
              },
              "prsnCustNum": {
                "type": "string",
                "title": "(对公)个人客户编号",
                "description": ""
              },
              "relaCustTel": {
                "type": "string",
                "title": "(对公)关系人电话",
                "description": ""
              },
              "relaType": {
                "type": "string",
                "title": "(对公)关系类型",
                "description": ""
              },
              "validInd": {
                "type": "string",
                "title": "(对公)是否有效",
                "description": ""
              },
              "relaExpiresDate": {
                "type": "string",
                "title": "(对公)关系到期时间",
                "description": ""
              },
              "relaCertInvalidDt": {
                "type": "string",
                "title": "(对公)证件失效日期",
                "description": ""
              },
              "genderCd": {
                "type": "string",
                "title": "(对公)性别",
                "description": ""
              },
              "nationCd": {
                "type": "string",
                "title": "(对公)国籍",
                "description": ""
              },
              "careerCd": {
                "type": "string",
                "title": "(对公)职业类型",
                "description": ""
              },
              "addrTypeCd": {
                "type": "string",
                "title": "(对公)地址类型",
                "description": ""
              },
              "provCd": {
                "type": "string",
                "title": "(对公)省",
                "description": ""
              },
              "cityCd": {
                "type": "string",
                "title": "(对公)市",
                "description": ""
              },
              "countyCd": {
                "type": "string",
                "title": "(对公)县",
                "description": ""
              },
              "addrInfo": {
                "type": "string",
                "title": "(对公)详细地址",
                "description": ""
              },
              "contTypeCd": {
                "type": "string",
                "title": "(对公)联系类型",
                "description": ""
              },
              "contInfo": {
                "type": "string",
                "title": "(对公)联系信息",
                "description": ""
              },
              "isLegalPerson": {
                "type": "string",
                "title": "(对公)是否法定代表人",
                "description": ""
              },
              "certNum": {
                "type": "string",
                "title": "(对公)证件号码",
                "description": ""
              },
              "certIssueOrgName": {
                "type": "string",
                "title": "(对公)证件签发机关名称",
                "description": ""
              },
              "relaCertEffectDt": {
                "type": "string",
                "title": "(对公)证件发证日期",
                "description": "yyyy-MM-dd"
              }
            }
          }
        },
        "images": {
          "type": "array",
          "title": "(对公)影像信息",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "imageStorageMode": {
                "type": "string",
                "title": "(对公)影像存储方式",
                "description": ""
              },
              "fileType": {
                "type": "string",
                "title": "(对公)文件类型编号",
                "description": ""
              },
              "fileAddr": {
                "type": "string",
                "title": "(对公)文件地址",
                "description": ""
              },
              "fileName": {
                "type": "string",
                "title": "(对公)文件名称",
                "description": ""
              },
              "channelCustNum": {
                "type": "string",
                "title": "(对公)渠道客户编号",
                "description": ""
              },
              "memoTxt": {
                "type": "string",
                "title": "(对公)备注",
                "description": ""
              },
              "validInd": {
                "type": "string",
                "title": "(对公)是否有效",
                "description": ""
              }
            }
          }
        }
      }
    },
    "mergData": {
      "type": "object",
      "title": "(对公)合并客户信息",
      "description": "",
      "additionalProperties": true,
      "properties": {
        "actlCurrCd": {
          "type": "string",
          "title": "(对公)实收资本币别",
          "description": ""
        },
        "actlRecvCap": {
          "type": "number",
          "title": "(对公)实收资本",
          "description": ""
        },
        "agrcltRelatedCustInd": {
          "type": "string",
          "title": "(对公)涉农客户标志",
          "description": ""
        },
        "bankCode": {
          "type": "string",
          "title": "(对公)法人代码",
          "description": ""
        },
        "basicAcctAuthCertNum": {
          "type": "string",
          "title": "(对公)开户许可证号",
          "description": ""
        },
        "basicAcctAuthMatureDt": {
          "type": "string",
          "title": "(对公)基本户开户许可证到期日期",
          "description": ""
        },
        "basicAcctNum": {
          "type": "string",
          "title": "(对公)基本账户账号",
          "description": ""
        },
        "basicAcctOpenBankName": {
          "type": "string",
          "title": "(对公)基本账户开户行名称",
          "description": ""
        },
        "belongIndusCd": {
          "type": "string",
          "title": "(对公)所属行业",
          "description": ""
        },
        "corpBizIn": {
          "type": "number",
          "title": "(对公)上年营业收入",
          "description": ""
        },
        "corpEmplyPersonCnt": {
          "type": "integer",
          "title": "(对公)上年末企业从业人员",
          "description": ""
        },
        "corpFoundDt": {
          "type": "string",
          "title": "(对公)企业成立日期",
          "description": ""
        },
        "corpOperStatCd": {
          "type": "string",
          "title": "(对公)经营状态",
          "description": ""
        },
        "corpSizeCd": {
          "type": "string",
          "title": "(对公)企业规模",
          "description": ""
        },
        "corpTotalAsset": {
          "type": "number",
          "title": "(对公)上年末资产总额",
          "description": ""
        },
        "corpTypeCd": {
          "type": "string",
          "title": "(对公)企业类型",
          "description": ""
        },
        "custDataIntactInd": {
          "type": "string",
          "title": "(对公)客户资料是否完整",
          "description": ""
        },
        "custEnName": {
          "type": "string",
          "title": "(对公)英文名称",
          "description": ""
        },
        "custName": {
          "type": "string",
          "title": "(对公)客户名称",
          "description": ""
        },
        "custNum": {
          "type": "string",
          "title": "(对公)客户编号",
          "description": ""
        },
        "custStatusCd": {
          "type": "string",
          "title": "(对公)客户状态",
          "description": ""
        },
        "custTypeCd": {
          "type": "string",
          "title": "(对公)客户类型",
          "description": ""
        },
        "depPsnCate": {
          "type": "string",
          "title": "(对公)存款人类别",
          "description": ""
        },
        "ecomnCompntCd": {
          "type": "string",
          "title": "(对公)经济成分",
          "description": ""
        },
        "econTypeCd": {
          "type": "string",
          "title": "(对公)经济类型",
          "description": ""
        },
        "finOrgCustCd": {
          "type": "string",
          "title": "(对公)同业客户类型",
          "description": ""
        },
        "finOrgIndusCd": {
          "type": "string",
          "title": "(对公)金融机构行业分类",
          "description": ""
        },
        "firstLoanDt": {
          "type": "string",
          "title": "(对公)首贷时间",
          "description": ""
        },
        "forgnInduCorpCd": {
          "type": "string",
          "title": "(对公)外汇企业属性",
          "description": ""
        },
        "greenCorpInd": {
          "type": "string",
          "title": "(对公)是否绿色企业",
          "description": ""
        },
        "groupCustInd": {
          "type": "string",
          "title": "(对公)是否集团客户",
          "description": ""
        },
        "indvBizInd": {
          "type": "string",
          "title": "(对公)个体工商户标志",
          "description": ""
        },
        "issuerInd": {
          "type": "string",
          "title": "(对公)发行人标志",
          "description": ""
        },
        "listCorpInd": {
          "type": "string",
          "title": "(对公)上市公司标志",
          "description": ""
        },
        "loanCardNum": {
          "type": "string",
          "title": "(对公)贷款卡编号",
          "description": ""
        },
        "locaCtyZoneCd": {
          "type": "string",
          "title": "(对公)所在国家和地区",
          "description": ""
        },
        "memoTxt": {
          "type": "string",
          "title": "(对公)备注",
          "description": ""
        },
        "merchtInd": {
          "type": "string",
          "title": "(对公)是否商户",
          "description": ""
        },
        "nationEcoDeptCd": {
          "type": "string",
          "title": "(对公)国民经济部门",
          "description": ""
        },
        "operBiz": {
          "type": "string",
          "title": "(对公)经营范围",
          "description": ""
        },
        "orgCateCd": {
          "type": "string",
          "title": "(对公)组织机构类别",
          "description": ""
        },
        "oversInd": {
          "type": "string",
          "title": "(对公)境内境外标志",
          "description": ""
        },
        "pbcFinOrgCd": {
          "type": "string",
          "title": "(对公)人行金融机构编码",
          "description": ""
        },
        "rgstCap": {
          "type": "number",
          "title": "(对公)注册资本",
          "description": ""
        },
        "rgstCurrCd": {
          "type": "string",
          "title": "(对公)注册资本币别",
          "description": ""
        },
        "techCorpInd": {
          "type": "string",
          "title": "(对公)是否科技企业",
          "description": ""
        },
        "unitCharCd": {
          "type": "string",
          "title": "(对公)单位性质",
          "description": ""
        },
        "cstInfoStatus": {
          "type": "string",
          "title": "客户信息异常标识",
          "description": ""
        },
        "sourceSys": {
          "type": "string",
          "title": "源系统标识",
          "description": ""
        },
        "isPotential": {
          "type": "string",
          "title": "潜客标识",
          "description": ""
        },
        "custTypeCdSub": {
          "type": "string",
          "title": "客户类型细分",
          "description": ""
        },
        "netAsset": {
          "type": "number",
          "title": "净资产",
          "description": ""
        },
        "agrcltRelatedScope": {
          "type": "string",
          "title": "涉农范围",
          "description": ""
        },
        "custMgrNum": {
          "type": "string",
          "title": "(对公)客户经理编号",
          "description": ""
        },
        "macctAvg": {
          "type": "number",
          "title": "(对公)月日均",
          "description": ""
        },
        "cacctAvg": {
          "type": "number",
          "title": "(对公)年日均",
          "description": ""
        },
        "grade": {
          "type": "string",
          "title": "(对公)客户等级",
          "description": ""
        },
        "natureFunds": {
          "type": "string",
          "title": "(对公)资金性质",
          "description": ""
        },
        "basicAcctOpenBankCode": {
          "type": "string",
          "title": "(对公)基本账户开户行行号",
          "description": ""
        },
        "swiftCode": {
          "type": "string",
          "title": "(对公)银行国际代码",
          "description": ""
        },
        "basicAcctnRegionCode": {
          "type": "string",
          "title": "(对公)基本存款账户开户地区代码",
          "description": ""
        },
        "mergeCustNum": {
          "type": "string",
          "title": "(对公)合并客户号",
          "description": ""
        },
        "certificates": {
          "type": "array",
          "title": "(对公)证件类型数组",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "certCustName": {
                "type": "string",
                "title": "(对公)证件名称",
                "description": ""
              },
              "certEffectDt": {
                "type": "string",
                "title": "(对公)证件生效日期",
                "description": ""
              },
              "certInvalidDt": {
                "type": "string",
                "title": "(对公)证件失效日期",
                "description": ""
              },
              "certIssueOrgName": {
                "type": "string",
                "title": "(对公)证件签发机关名称",
                "description": ""
              },
              "certNum": {
                "type": "string",
                "title": "(对公)证件号码",
                "description": ""
              },
              "certTypeCd": {
                "type": "string",
                "title": "(对公)证件类型",
                "description": ""
              },
              "recntYearCheckDt": {
                "type": "string",
                "title": "(对公)最近一次年检日期",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "idtfyCheckInd": {
                "type": "string",
                "title": "(对公)联网核查情况",
                "description": ""
              },
              "isExpCer": {
                "type": "string",
                "title": "(对公)证件是否到期",
                "description": ""
              },
              "majorCertInd": {
                "type": "string",
                "title": "(对公)主证件标志",
                "description": ""
              },
              "recdStatus": {
                "type": "string",
                "title": "(对公)记录状态",
                "description": ""
              }
            }
          }
        },
        "contactAddrs": {
          "type": "array",
          "title": "(对公)地址信息",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "addrInfo": {
                "type": "string",
                "title": "(对公)详细地址",
                "description": ""
              },
              "addrTypeCd": {
                "type": "string",
                "title": "(对公)地址类型",
                "description": ""
              },
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "ctyZoneCd": {
                "type": "string",
                "title": "(对公)国家和地区",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "provCd": {
                "type": "string",
                "title": "(对公)省",
                "description": ""
              },
              "cityCd": {
                "type": "string",
                "title": "(对公)市",
                "description": ""
              },
              "countyCd": {
                "type": "string",
                "title": "(对公)县",
                "description": ""
              },
              "majorInd": {
                "type": "string",
                "title": "(对公)主要标志",
                "description": ""
              },
              "postCode": {
                "type": "string",
                "title": "(对公)邮政编码",
                "description": ""
              },
              "recdStatus": {
                "type": "string",
                "title": "(对公)记录状态",
                "description": ""
              }
            }
          }
        },
        "contacts": {
          "type": "array",
          "title": "(对公)联系信息",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "contInfo": {
                "type": "string",
                "title": "(对公)联系信息",
                "description": ""
              },
              "contTypeCd": {
                "type": "string",
                "title": "(对公)联系类型",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "majorInd": {
                "type": "string",
                "title": "(对公)主要标志",
                "description": ""
              },
              "recdStatus": {
                "type": "string",
                "title": "(对公)记录状态",
                "description": ""
              },
              "isPhoneTrilateral": {
                "type": "string",
                "title": "(对公)手机号三方查验标志",
                "description": ""
              },
              "atchRltnpTp": {
                "type": "string",
                "title": "(对公)归属关系",
                "description": ""
              },
              "memoTxt": {
                "type": "string",
                "title": "(对公)备注",
                "description": ""
              }
            }
          }
        },
        "entpAndEntps": {
          "type": "array",
          "title": "(对公)单位与单位关系",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "actlInvestAmt": {
                "type": "number",
                "title": "(对公)实际出资金额",
                "description": ""
              },
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "relaCertType": {
                "type": "string",
                "title": "(对公)关系客户证件类型",
                "description": ""
              },
              "relaCertNum": {
                "type": "string",
                "title": "(对公)关系客户证件号码",
                "description": ""
              },
              "relaCertInvalidDt": {
                "type": "string",
                "title": "(对公)关系客户证件失效日期",
                "description": ""
              },
              "custName": {
                "type": "string",
                "title": "(对公)客户名称",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "holdStockCnt": {
                "type": "string",
                "title": "(对公)持股情况",
                "description": ""
              },
              "investCurrCd": {
                "type": "string",
                "title": "(对公)出资币种",
                "description": ""
              },
              "investRatio": {
                "type": "number",
                "title": "(对公)出资比例",
                "description": ""
              },
              "memoTxt": {
                "type": "string",
                "title": "(对公)备注",
                "description": ""
              },
              "oughtInvestAmt": {
                "type": "number",
                "title": "(对公)应出资金额",
                "description": ""
              },
              "relaCustNum": {
                "type": "string",
                "title": "(对公)关系客户编号",
                "description": ""
              },
              "relaType": {
                "type": "string",
                "title": "(对公)关系类型",
                "description": ""
              },
              "relaExpiresDate": {
                "type": "string",
                "title": "(对公)关系到期时间",
                "description": ""
              },
              "addrTypeCd": {
                "type": "string",
                "title": "(对公)地址类型",
                "description": ""
              },
              "addrInfo": {
                "type": "string",
                "title": "(对公)详细地址",
                "description": ""
              }
            }
          }
        },
        "entpAndPrsns": {
          "type": "array",
          "title": "(对公)单位与个人关系",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "actlInvestAmt": {
                "type": "number",
                "title": "(对公)实际出资金额",
                "description": ""
              },
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "certTypeCd": {
                "type": "string",
                "title": "(对公)证件类型",
                "description": ""
              },
              "custName": {
                "type": "string",
                "title": "(对公)客户名称",
                "description": ""
              },
              "entpCustNum": {
                "type": "string",
                "title": "(对公)对公客户编号",
                "description": ""
              },
              "holdPos": {
                "type": "string",
                "title": "(对公)担任职务",
                "description": ""
              },
              "holdPosDt": {
                "type": "string",
                "title": "(对公)担任该职务时间",
                "description": ""
              },
              "holdStockCnt": {
                "type": "string",
                "title": "(对公)持股情况",
                "description": ""
              },
              "indusWorkYears": {
                "type": "integer",
                "title": "(对公)相关行业从业年限",
                "description": ""
              },
              "investCurrCd": {
                "type": "string",
                "title": "(对公)出资币种",
                "description": ""
              },
              "investDate": {
                "type": "string",
                "title": "(对公)出资日期",
                "description": ""
              },
              "investRatio": {
                "type": "number",
                "title": "(对公)出资比例",
                "description": ""
              },
              "investType": {
                "type": "string",
                "title": "(对公)出资方式",
                "description": ""
              },
              "memoTxt": {
                "type": "string",
                "title": "(对公)备注",
                "description": ""
              },
              "oughtInvestAmt": {
                "type": "number",
                "title": "(对公)应出资金额",
                "description": ""
              },
              "prsnCustNum": {
                "type": "string",
                "title": "(对公)个人客户编号",
                "description": ""
              },
              "relaCustTel": {
                "type": "string",
                "title": "(对公)关系人电话",
                "description": ""
              },
              "relaType": {
                "type": "string",
                "title": "(对公)关系类型",
                "description": ""
              },
              "validInd": {
                "type": "string",
                "title": "(对公)是否有效",
                "description": ""
              },
              "relaExpiresDate": {
                "type": "string",
                "title": "(对公)关系到期时间",
                "description": ""
              },
              "relaCertInvalidDt": {
                "type": "string",
                "title": "(对公)证件失效日期",
                "description": ""
              },
              "genderCd": {
                "type": "string",
                "title": "(对公)性别",
                "description": ""
              },
              "nationCd": {
                "type": "string",
                "title": "(对公)国籍",
                "description": ""
              },
              "careerCd": {
                "type": "string",
                "title": "(对公)职业类型",
                "description": ""
              },
              "addrTypeCd": {
                "type": "string",
                "title": "(对公)地址类型",
                "description": ""
              },
              "provCd": {
                "type": "string",
                "title": "(对公)省",
                "description": ""
              },
              "cityCd": {
                "type": "string",
                "title": "(对公)市",
                "description": ""
              },
              "countyCd": {
                "type": "string",
                "title": "(对公)县",
                "description": ""
              },
              "addrInfo": {
                "type": "string",
                "title": "(对公)详细地址",
                "description": ""
              },
              "contTypeCd": {
                "type": "string",
                "title": "(对公)联系类型",
                "description": ""
              },
              "contInfo": {
                "type": "string",
                "title": "(对公)联系信息",
                "description": ""
              },
              "isLegalPerson": {
                "type": "string",
                "title": "(对公)是否法定代表人",
                "description": ""
              },
              "certNum": {
                "type": "string",
                "title": "(对公)证件号码",
                "description": ""
              },
              "certIssueOrgName": {
                "type": "string",
                "title": "(对公)证件签发机关名称",
                "description": ""
              },
              "relaCertEffectDt": {
                "type": "string",
                "title": "(对公)证件发证日期",
                "description": ""
              }
            }
          }
        },
        "images": {
          "type": "array",
          "title": "(对公)影像信息",
          "description": "",
          "items": {
            "type": "object",
            "title": "items",
            "description": "",
            "additionalProperties": true,
            "properties": {
              "bankCode": {
                "type": "string",
                "title": "(对公)法人代码",
                "description": ""
              },
              "custNum": {
                "type": "string",
                "title": "(对公)客户编号",
                "description": ""
              },
              "imageStorageMode": {
                "type": "string",
                "title": "(对公)影像存储方式",
                "description": ""
              },
              "fileType": {
                "type": "string",
                "title": "(对公)文件类型编号",
                "description": ""
              },
              "fileAddr": {
                "type": "string",
                "title": "(对公)文件地址",
                "description": ""
              },
              "fileName": {
                "type": "string",
                "title": "(对公)文件名称",
                "description": ""
              },
              "channelCustNum": {
                "type": "string",
                "title": "(对公)渠道客户编号",
                "description": ""
              },
              "memoTxt": {
                "type": "string",
                "title": "(对公)备注",
                "description": ""
              },
              "validInd": {
                "type": "string",
                "title": "(对公)是否有效",
                "description": ""
              }
            }
          }
        }
      }
    }
  }
};
</script>
```

```jsx
<n-tree
  data={{
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'http://example.com/example.json',
    type: 'object',
    additionalProperties: true,
    properties: {
      user: {
        type: 'object',
        title: '用户信息',
        propertyOrder: 12,
        required: ['name', 'email'],
        properties: {
          name: {
            type: 'string',
            title: '姓名',
            description: '',
            default: '',
          },
          works: {
            type: 'object',
            title: '履历',
            description: '',
            required: ['desgin'],
            properties: {
              desgin: {
                type: 'string',
                title: '设计',
                description: '',
              },
            },
          },
        },
      },
      tags: {
        type: 'array',
        title: '标签',
        description: '',
        items: {
          type: 'object',
          title: 'items',
          description: '',
          additionalProperties: true,
          properties: {
            s: {
              type: 'string',
              title: 's',
              description: '',
            },
          },
        },
      },
    },
  }}
  from-schema
/>
```
