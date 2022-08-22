const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const parseCode = (code) => {
  let output = {};

  try {
    output = parser.parse(code, {
      sourceType: "module",

      plugins: ["jsx", "typescript"]
    });
  } catch (err) {
    return [];
  }

  const res = [];

  traverse(output, {
    enter(path) {
      res.push({ ...path.node.loc, node: path.node });
    }
  });

  return res;
};

module.exports = {
  parseCode
};

// console.log(JSON.stringify(locs))
