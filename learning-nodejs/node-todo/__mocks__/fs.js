const fs = jest.genMockFromModule('fs');

fs.test = () => {
  return "xxx"
}
module.exports = fs;