const BS_TEST = /\.(bs.js)$/;
const isCompiledFile = fileName => BS_TEST.test(fileName);

exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
  const oldPage = { ...page };

  if (isCompiledFile(page.component)) {
    // Remove .bs components so we don't have duplicates
    let { path } = page;
    let newPath = path
      .replace(/\.bs/, "")
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase();
    deletePage(oldPage);
    createPage({ ...page, path: newPath });
  }
};
