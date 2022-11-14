'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');


delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
const CRP_ENV = process.env.CRP_ENV;
if (!CRP_ENV) {
  throw new Error(
    'The CRP_ENV environment variable is required but was not specified.'
  );
}


const dotenvFiles = [
  `${paths.dotenv}.${CRP_ENV}.local`,
  CRP_ENV !== 'test' && `${paths.dotenv}.local`,
  `${paths.dotenv}.${CRP_ENV}`,
  paths.dotenv,
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  console.log('dotenvFile', dotenvFile)
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});



const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

const REACT_APP = /^crp_/i;
function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: publicUrl,
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
        FAST_REFRESH: process.env.FAST_REFRESH !== 'false',
      }
    );
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
  return { raw, stringified };
}

console.log('getClientEnvironment', getClientEnvironment())
// process.exit(1);
module.exports = getClientEnvironment;
