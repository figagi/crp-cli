const { readdir } = require('fs');

/**
 * 获取文件夹下的所有文件路径
 * @param {PathLike} dir 文件夹路径
 * @returns 文件夹中所有文件路径集合
 */
async function readDirFilePath(dir) {
  return new Promise((resolve, reject) => {
    let filesPath = [];
    readdir(dir, { withFileTypes: true }, async (err, files) => {
      if (err) reject(err)

      while(files.length) {
        const item = files.pop();
        if (item.isDirectory()) {
          const childPaths = await readDirFilePath(`${dir}/${item.name}`);
          filesPath = [...filesPath, ...childPaths];
          continue;
        }
        filesPath.push(`${dir}/${item.name}`)
      }
      resolve(filesPath);
    });
  })
}

module.exports = { readDirFilePath }