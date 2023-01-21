function resizeImage(base64Str) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 200, 200);
      resolve(canvas.toDataURL());
    };
    img.onerror = error => {
      reject(error);
    }
  });
}

export default resizeImage;
