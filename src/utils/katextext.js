import katex from 'katex/dist/katex.min';

const replaceWithKatex = (source) => {
  var regex = /\[\[\[(.+?)\]\]\]/g; // [[[]]] 中括号
  var arr = source.match(regex);
  if (arr && arr.length > 0) {
    arr.map(item => {
        var tmp = item.slice(3, item.length - 3);
        source = source.replace(item,katex.renderToString(tmp));
      },
    );
  }
  return source;
};
export default replaceWithKatex;
