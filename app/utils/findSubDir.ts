function findSubDir(dir: any, id: string) {
  let result: any[] = [];
  if (dir.belong && dir.belong === id) {
    result.push(dir);
  } else {
    dir.children.forEach((item: any) => {
      const subDir = findSubDir(item, id);
      result = result.concat(subDir);
    });
  }
  return result;
}

export default findSubDir;
