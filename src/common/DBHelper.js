/*
	 indexDB操作库 包括以下基础功能
	 db链接的打开关闭
	 表的 增、删、改、获取
	 数据的 增、删、改、获取
 */
export default {
	//打开一个数据库链接
	open(name, version) {
			const _req = indexedDB.open(name, version);
			return new Promise((resolve, reject) => {
				_req.onerror = function(e) {
					reject(e);
				};
				_req.onsuccess = function(e) {
					var _db = e.target.result;
					resolve(_db);
				};
				_req.onupgradeneeded = function(e) {
					var _db = e.target.result;
					resolve(_db);
				}
			})
		},
		//关闭数据库
		close(db) {
			db.close();
		},

		//删除数据库
		deleteDB(name) {
			indexedDB.deleteDatabase(name);
		},
		//创建表
		createObjectStore(db, name, options) {
			if(!db.objectStoreNames.contains(name)) {
				var _req = db.createObjectStore(name, {
					keyPath: options.keyPath
				});
				_req.onsuccess = function(e) {
					console.log(e.target.result);
				}
			}
		},
		//获取表
		getObjectStore(db, name) {
			var transaction = db.transaction(name); //打开一个事务，使用students 和teacher object store
			return transaction.objectStore(name); //获取students object store
		},
		//清空表
		clearObjectStore(db, storeName) {
			var transaction = db.transaction(storeName, 'readwrite');
			var store = transaction.objectStore(storeName);
			store.clear();
		},
		//删除表
		deleteObjectStore(db, storeName) {
			if(db.objectStoreNames.contains('students')) {
				db.deleteObjectStore('students');
			}
		},
		//添加数据
		addData(db, storeName, dataList) {
			var transaction = db.transaction(storeName, 'readwrite');
			var store = transaction.objectStore(storeName);

			for(var i = 0; i < dataList.length; i++) {
				store.add(dataList[i]);
			}
		},
		//获取数据通过主键
		getDataByKey(db, storeName, value) {

			return new Promise((resolve, reject) => {
				var transaction = db.transaction(storeName, 'readwrite');
				var store = transaction.objectStore(storeName);
				var request = store.get(value);
				request.onsuccess = function(e) {
					resolve(e.target.result)
				};
				request.onerror = function(e) {
					reject(e.target.result)
				};
			})

		},
		//更新数据通过主键
		updateDataByKey(db, storeName, value) {
			var transaction = db.transaction(storeName, 'readwrite');
			var store = transaction.objectStore(storeName);
			var request = store.get(value);
			request.onsuccess = function(e) {
				var student = e.target.result;
				student.age = 35;
				store.put(student);
			};
		},
		//删除数据通过主键
		deleteDataByKey(db, storeName, value) {
			var transaction = db.transaction(storeName, 'readwrite');
			var store = transaction.objectStore(storeName);
			store.delete(value);
		}
}
