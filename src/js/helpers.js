import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
    // console.error(`${err} 🤢🤢🤢🤢 IN helper.js 🤢`);
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchReq = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res= await Promise.race([fetchReq, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
    // console.error(`${err} 🤢🤢🤢🤢 IN helper.js 🤢`);
  }
};
