const fs = require('fs');
const superagent = require('superagent');

// promisify readFile() function
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😢');
      // data in resolve will be the result of the Promise that is available in the .then handler
      resolve(data);
    });
  });
};

// promisify writeFile() function
const writeFilePro = function(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const result1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const result2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const result3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([result1Pro, result2Pro, result3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);
    // console.log(Promise.prototype);

    await writeFilePro('dog-img.txt', imgs.join(',\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
    // stop promise from being successfully resolved by throwing an error
    throw err;
  }
  return '2: READY 🐶'; // promised return value of the async-await/promise-function
};
// async function automatically returns a promise; value that is returned from the async function will be the resolved promise > handle it as yet another promise, ie. use another async-await function to deal with the promise originating from the first async-await function

(async () => {
  try {
    console.log('1: Will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('ERROR 🤯');
  }
})();

/*
console.log('1: Will get dog pics');
getDogPic()
  .then(x => {
    console.log(x);
    console.log('3: Done getting dog pics');
  })
  .catch(err => console.log('ERROR 🤯'));
// an async function returns a promise automatically
// console.log(x);
*/

/*
console.log('1: Will get dog pics');
const x = getDogPic();
console.log(x);
console.log('3: Done getting dog pics');
*/

/*
// flat structure of chained promises
readFilePro(`${__dirname}/dog.txt`, 'utf-8')
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  // result parameter will be the resolved promise of the superagent.get() method/handler
  .then(result => {
    console.log(result.body.message);
    return writeFilePro('dog-img.txt', result.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch(err => {
    console.log(err);
  });
*/
