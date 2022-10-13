/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const modifyVars = require('@moneko/core/build/modifyVars').default;

const options = {
  '--dir': null,
};

let modifyVarBash = '';

for (const k in modifyVars) {
  if (Object.hasOwnProperty.call(modifyVars, k)) {
    modifyVarBash += `--modify-var="${k}=${modifyVars[k]}" `;
  }
}

function execute(cmd) {
  return new Promise((resolut, reject) => {
    exec(cmd, function (error) {
      if (error) {
        reject(error);
      } else {
        resolut('success');
      }
    });
  });
}

let rmless = [];

function dealScri(arr) {
  if (arr && arr.length) {
    arr.forEach((filepath) => {
      const pathWithRegex = /\*?\.less/g; // 替换 .less 为 .css
      let fileStr = fs.readFileSync(filepath, 'utf-8');

      if (pathWithRegex.test(fileStr)) {
        console.log('替换.less:', filepath);
        fs.writeFileSync(filepath, fileStr.replace(pathWithRegex, '.css'));
      }
    });
  }
}

function walk(dir) {
  let results = [];
  let list = fs.readdirSync(dir);

  list.forEach(function (file) {
    // 排除static静态目录（可按你需求进行新增）
    if (file === 'static') {
      return false;
    }
    // eslint-disable-next-line no-param-reassign
    file = dir + '/' + file;
    let stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      const pathWithRegex = /^.\/src*?\//g; // 以 ./src 开头，以 / 结尾
      const lessRegex = /\*?.less$/g; // 以 .less 结尾
      let outputPath = '';

      switch (path.extname(file)) {
        case '.less':
          if (file.endsWith('.less')) {
            outputPath = file.replace(pathWithRegex, './lib/').replace(lessRegex, '.css');
            execute(`npx lessc --js ${modifyVarBash} ${file} > ${outputPath}`)
              .then((res) => {
                rmless.push(file);
                console.log('lessc:', `${outputPath}`, `${res}`);
                execute(`npx postcss -c postcss.config.js ${outputPath} -o ${outputPath}`)
                  .then((postCssRes) => {
                    console.log('postcss:', `${outputPath}`, `${postCssRes}`);
                    fs.unlink(path.join(__dirname, file), (err) => err);
                  })
                  .catch((postCssRej) => {
                    console.log('postcss:', `${outputPath}`, `${postCssRej}`);
                  });
              })
              .catch((rej) => {
                console.log('lessc:', `${outputPath}`, `${rej}`);
              });
          }
          break;
        case '.js':
          // 过滤后缀名（可按你需求进行新增）
          results.push(path.resolve(__dirname, file));
          break;
        default:
          break;
      }
    }
  });
  return results;
}

const args = process.argv.splice(2);

console.log('所传递的参数是：', args);

args.forEach(function (val) {
  const arg = val.split('=');

  options[arg[0]] = arg[1] || true;
});

if (options['--dir']) {
  dealScri(walk(options['--dir']));
}
