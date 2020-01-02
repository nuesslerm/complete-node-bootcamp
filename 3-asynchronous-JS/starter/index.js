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
