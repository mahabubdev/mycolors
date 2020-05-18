import SecureLS from 'secure-ls';

const ls = new SecureLS({
    encodingType: 'aec',
    isCompression: true,
    encryptionSecret: process.env.SECRET,
});

/**
 * ls.set('key-name', <object>); // set a value with key into localStorage ex. {test: 'secured'}
 * ls.get('key-name'); // get value by key-name
 * ls.clear(); // clear localStorage
 * ls.remove('key-name'); // remove value by key-name
 * ls.removeAll(); // remove all keys with values from localStorage
 * ls.getAllKeys(); // return all keys from localStorage
 */

console.log(process.env.SECRET);

export default ls;