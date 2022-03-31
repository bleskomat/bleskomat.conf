const fs = require('fs').promises;
const path = require('path');

const tmpDir = path.join(__dirname, '..', 'tmp');
const removeDir = function(dirPath) {
	return fs.readdir(dirPath).then(files => {
		// Delete all files in the directory.
		return Promise.all(files.map(file => {
			const filePath = path.join(dirPath, file);
			return fs.stat(filePath).then(stat => {
				if (stat.isDirectory()) {
					// Recursively delete any sub-directories.
					return removeDir(filePath);
				}
				// Delete the file.
				return fs.unlink(filePath);
			});
		})).then(() => {
			// Finally delete the directory itself.
			return fs.rmdir(dirPath);
		})
	}).catch(error => {
		if (error) {
			if (/no such file or directory/i.test(error.message)) {
				// Directory doesn't exist. Ignore the error.
			} else {
				// Re-throw any other error.
				throw error;
			}
		}
	});
};

before(function() {
	// Make tmpDir available inside tests and hooks.
	this.tmpDir = tmpDir;
});

before(function() {
	return removeDir(tmpDir);
});

before(function() {
	return fs.mkdir(tmpDir, { recursive: true });
});

after(function() {
	return removeDir(tmpDir);
});
