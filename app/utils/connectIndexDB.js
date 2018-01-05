function openIndexDBOrCreateNew(name) {
  return new Promise((resolve, reject) => {
    try {
      const request = window.indexedDB.open(name);
      request.addEventListener('success', () => {
        const db = request.result;
        resolve(db);
      });

      request.addEventListener('error', () => {
        throw new Error('打开数据库失败');
      });
    } catch (err) {
      reject(err);
    }
  });
}


const connectIndexDB = async (name) => {
  const db = await openIndexDBOrCreateNew(name);
  return db;
};

export default connectIndexDB;
