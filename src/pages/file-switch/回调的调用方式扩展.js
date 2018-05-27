let inputChange = (e) => {
  let file = e.target.files[0];
  //老的处理方式：回调方式
  let fileToDataURL = (file, callBack) => {
    let fR = new FileReader();
    fR.readAsDataURL(file);//将文件读取为 DataURL（base64）
    fR.onload = (e) => {//e??
      typeof callBack == 'function' && callBack(e.target.result);
    }
  };

  //调用
  fileToDataURL(file, (res) => {
    console.log('fileToDataURL-res:', res)
  });

  //新的es6处理方式（运用Promise函数）
  let fileToDataURL2 = (file) => {
    return new Promise((resolve, reject) => {
      let fR = new FileReader();
//            console.log('fR:',fR)
      fR.readAsDataURL(file);//将文件读取为 DataURL（base64）
      fR.onload = (e) => {//e??
//              console.log('e:', e)
        //e: ProgressEvent {isTrusted: true, lengthComputable: true, loaded: 41826, total: 41826, type: "load", target:FileReader {readyState: 2, result: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD…y5ru9r+YyX+1ct5H9nfa9427vtO7Pf/Z20/yI96/T8P16H//Z", error: null, onloadstart: null, onprogress: null, …}
        resolve(e.target.result);
      }
    })
  };

  //es6的then方式调用
  fileToDataURL2(file).then((res) => {
    console.log('then-catch-fileToDataURL2-res:', res)//fileToDataURL2:data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABk...8P16H//Z
  }).catch((err) => {
    console.log('then-catch-fileToDataURL2-err:', err)
  })

  //es7的async await 方式调用
  (async () => {
    try {
      let res = await fileToDataURL2(file)
      console.log('async-await-fileToDataURL2-res:', res)//fileToDataURL2:data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABk...8P16H//Z
    } catch (err) {
      console.log('err:', err)
    }
  })();

  //调用 file=>dataURL
  fileToDataURL(file, (res) => {
    console.log('fileToDataURL-res:', res)
  });

}
