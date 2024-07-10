class DownloadHelper {
    download(blob, fileName) {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
    }

    downloadFileByPath(path, filename) {
        let a = document.createElement("a");
        a.download = filename;
        a.href = path;
        a.click();
    }
}

export default new DownloadHelper()