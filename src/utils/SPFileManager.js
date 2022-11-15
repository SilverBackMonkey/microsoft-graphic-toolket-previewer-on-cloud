
// const authContext = new IAuthOptions({
//     username: process.env['username'],
//     password: process.env['password'],
// })


export const downloadFile = (path) => {
    let filePathToDownload = path;

    const link = document.createElement('a');
    link.href = filePathToDownload;

    link.click();

}