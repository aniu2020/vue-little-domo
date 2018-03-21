#!/user/bin/env node

// 运行命令
// node g page [page名字]
// node g example [example名字]
// node g component [component 父文件夹名字] [component名字]

var fs = require("fs");
var path = require('path');

// let order = process.argv[2];
// let createNameItem = process.argv[3];

let orders = process.argv[2];
if (orders === 'component') {
  var [program, file, order, componentFatherName, ...createNameArr] = process.argv
} else {
  var [program, file, order, ...createNameArr] = process.argv
}
// console.log('createNameItems', createNameArr)
// console.log(process.argv, 111)
// return
// 添加页面
if (!order) {
  return false;
}
if (order === 'page' || order === 'example' || order === 'component') { // node wx page index => 创建 `/ROOT_PATH/pages/${createNameItem}`目录,写下面包括几个必须文件
  if (!createNameArr) {
    return false;
  } else {

    createNameArr.forEach((createNameItem, index) => {
      let _dir = ''
      let _dirFirst = ''
      if (order === 'page' || order === 'example') {
        _dir = `${__dirname}/src/${order}s/${createNameItem}`
        // console.log(_dir)
      }
      else if (order === 'component') {
        _dirFirst = `${__dirname}/src/${order}s/${componentFatherName}`
        _dir = `${__dirname}/src/${order}s/${componentFatherName}/${createNameItem}`
      }
      checkIsExit(_dir).then(res => {

        if (order === 'page' || order === 'example') {
          fs.mkdir(_dir, '0777', function () {
            //fs.mkdir(path, [mode], [callback(err)])： 以异步的方式创建文件目录。如果目录已存在，将抛出异常。 //http://www.jb51.net/article/58600.htm
            //path 将创建的目录路径
            //mode   目录权限（读写权限），默认0777
            //callback      回调，传递异常参数err
            addFiles(createNameItem);
          });
        } else if (order === 'component') {
          fs.mkdir(_dirFirst, '0777', function () {
            fs.mkdir(_dir, '0777', function () {
              addFiles(createNameItem);
            });
          });
        }
        else {
          addFiles(createNameItem);
        }
      })
        .catch(error => {
          console.log(error)
        })
    })

  }
}

function checkIsExit(dir) {
  return new Promise((resolve, reject) => {
    fs.exists(dir, result => {
      if (result) {
        reject('文件已经存在')
      } else {
        resolve(true)
      }
    })
  })
}

const vueText = (createNameItem, order) => {
  let str = `<script>
  import mixin from '@/mixin';
  export default {
    name: '${createNameItem}',
    template: require("./${createNameItem}.tpl.html"),
    data() {
      return {
        footerSet: {//网站脚部信息
          footerCur: '${createNameItem}',
          isHideFooter: false
        },
        headerSet: {//网站头部信息
          pageTitle: '${createNameItem}',
          isHideHeader: false
        },
      }
    },
    props: [""],
    mixins: [mixin],
    components: {},
    mounted() {
    },
    methods: {
      init(){

      }
    },
    computed: {},
    filters: {},
    watch: {},
    destroyed(){

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./${createNameItem}.scss"></style>
    
    `;

  let str2 = `<script>
  export default {
    name: '${createNameItem}',
    template: require("./${createNameItem}.tpl.html"),
    data() {
      return {
      }
    },
    props: [""],
    components: {},
    mounted() {
    },
    methods: {
    },
    computed: {},
    filters: {},
    watch: {},
    destroyed(){

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./${createNameItem}.scss"></style>
    
    `;
  let returnStr = '';
  order == 'component' ? returnStr = str2 : returnStr = str;
  return returnStr;
};

const styleText = (createNameItem) => {
  let str = `//${createNameItem}
.${createNameItem} {

}
    `;
  return str;
};


const htmlTplText = (createNameItem, order) => {
  let str = `<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" :autoFill="false">
  <section class="m-cont ${createNameItem}">

  </section>
</mt-loadmore>
  `;

  let str2 = `<section class="${createNameItem}">
</section>
  `;
  let returnStr = '';
  order == 'component' ? returnStr = str2 : returnStr = str;
  return returnStr;
}

//添加文件
function addFiles(createNameItem) {
  let filePath = '';
  if (order === 'page' || order === 'example') {
    filePath = `${__dirname}/src/${order}s/${createNameItem}`;
    console.log(filePath,1)
  }

  if (order === 'component') {
    filePath = `${__dirname}/src/${order}s/${componentFatherName}/${createNameItem}`;
  }

  if (order === 'page' || order === 'example' || order === 'component') {
    fs.writeFile(`${filePath}/${createNameItem}.vue`, vueText(createNameItem, order), function (err) {
      //以异步的方式将data写入文件，文件已存在的情况下，原内容将被替换。
      //fs.writeFile(filename, data, [options], [callback(err)])
      //filename      (String)            文件名称
      //data        (String | Buffer)    将要写入的内容，可以使字符串 或 buffer数据。
      //options        (Object)           option数组对象，包含：
      //· encoding   (string)            可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
      //· mode         (Number)        文件读写权限，默认值 438
      //· flag            (String)            默认值 ‘w'
      //callback {Function}  回调，传递一个异常参数err。
    });
    fs.writeFile(`${filePath}/${createNameItem}.tpl.html`, htmlTplText(createNameItem, order), function (err) {
    });
    fs.writeFile(`${filePath}/${createNameItem}.scss`, styleText(createNameItem), function (err) {
      console.log(`${filePath}/${createNameItem}.scss`, '页面创建完成!');
    });

  }
}
