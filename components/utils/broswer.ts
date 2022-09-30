interface BrowserTypes {
  name?: string;
  type?: string;
  version?: string | number;
  os?: string;
}

interface BrowserTypesForRegexMap extends BrowserTypes {
  regex: RegExp[];
}

type RegexMapTypes = {
  [key: string]: BrowserTypesForRegexMap;
};

const ua = navigator.userAgent;

const getFirstMatch = (regex: RegExp) => {
  const match = ua.match(regex);

  return (match && match.length > 1 && match[1]) || '';
};

const getSecondMatch = (regex: RegExp) => {
  const match = ua.match(regex);

  return (match && match.length > 1 && match[2]) || '';
};
const getOS = (userAgent: string) => {
  const osRegex = {
    macOS: /mac/,
    iPad: /ipad/,
    iPhone: /iphone os/,
    Android: /android/,
    'Windows CE': /windows ce/,
    'Windows Mobile': /windows mobile/,
    'Windows 2000': /windows nt 5.0/,
    'Windows XP': /windows nt 5.1/,
    'Windows Vista': /windows nt 6.0/,
    'Windows 7': /windows nt 6.1/,
    'Windows 8': /windows nt 6.2/,
    'Windows 8.1': /windows nt 6.3/,
    Linux: /linux/,
  };

  for (const os in osRegex) {
    if (Object.prototype.hasOwnProperty.call(osRegex, os)) {
      if (osRegex[os as keyof typeof osRegex].test(userAgent)) {
        return os;
      }
    }
  }
  return navigator.platform;
};

/**
 * 获取浏览器信息
 * @returns {BrowserTypes} 浏览器信息
 */
const getBrowser = (): BrowserTypes => {
  const regexMap: RegexMapTypes = {
    Opera: {
      regex: [/opera|opr/i],
      name: 'Opera',
      type: 'opera',
      version:
        getFirstMatch(/version\/(\d+(\.\d+)?)/i) ||
        getFirstMatch(/(?:opera|opr)[\s\\/](\d+(\.\d+)?)/i),
    },
    InternetExplorer: {
      regex: [/msie|trident/i],
      name: 'Internet Explorer',
      type: 'msie',
      version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i),
    },
    MicrosftEdge: {
      regex: [/chrome.+? Edg/i],
      name: 'Microsft Edge',
      type: 'msedge',
      version: getFirstMatch(/Edg\/(\d+(\.\d+)?)/i),
    },
    Chrome: {
      regex: [/chrome|crios|crmo/i],
      name: 'Google Chrome',
      type: 'chrome',
      version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
    },
    Firefox: {
      regex: [/firefox/i],
      name: 'Firefox',
      type: 'firefox',
      version: getFirstMatch(/(?:firefox)[ \\/](\d+(\.\d+)?)/i),
    },
    Android: {
      regex: [/(android)(?!like android)/i],
      name: 'Android',
      type: 'android',
      version: getFirstMatch(/version\/(\d+(\.\d+)?)/i),
    },
    Safari: {
      regex: [/safari/i],
      name: 'Safari',
      type: 'safari',
      version: getFirstMatch(/version\/(\d+(\.\d+)?)/i),
    },
  };
  const os = getOS(ua.toLowerCase());

  for (const key in regexMap) {
    if (Object.prototype.hasOwnProperty.call(regexMap, key)) {
      for (let i = 0, len = regexMap[key].regex.length || 0; len > i; i++) {
        if (regexMap[key].regex[i].test(ua)) {
          return {
            name: regexMap[key].name,
            type: regexMap[key].type,
            version: regexMap[key].version,
            os: os,
          };
        }
      }
    }
  }

  const name = getFirstMatch(/^(.*)\/(.*) /),
    version = getSecondMatch(/^(.*)\/(.*) /);

  return {
    name,
    version,
    type: name.toLowerCase().replace(/\s/g, ''),
    os,
  };
};

/**
 * 是否为移动设备
 * @returns {boolean} true / false
 */
export const isMobile = (): boolean => !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);

export default getBrowser;
