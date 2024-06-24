export default function convertToUppercase(str: string) {
  const string = str.split(' ');
  if (string.length > 1) {
    let newString = '';
    string.map((item, index) => {
      newString = newString.concat(convertToUppercase(item) + (string.length === index + 1 ? '' : ' '));
    });
    return newString;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
