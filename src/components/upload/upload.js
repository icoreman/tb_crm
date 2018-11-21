import { Component } from 'react';

import { Toast } from 'saltui';
import { UploadCore, Events, Status, VERSION } from 'uploadcore';

import './upload.less';

export default class Upload extends Component {



  constructor(props) {
    super(props);
    var label = props.label;
    if(!label){
      label = '';
    }

     // 上传类型images:图片,audios:附件,videos:视频
    var uploadType = props.uploadType;
     // 上传格式
     var extensions = props.extensions;

    // 文件大小限制，默认单位byte，默认0，表示不限制
    var fileSizeLimit = props.fileSizeLimit;
    if (fileSizeLimit == null || fileSizeLimit == '' || fileSizeLimit == undefined || fileSizeLimit == 'undefined') {
      fileSizeLimit = 0;
    }

    var accept = {};
    if(uploadType == 'image'){//图片
      accept = {
        title: '图片',
        extensions: 'jpg,jpeg,png,gif,webp,bmp',
        mimeTypes: 'image/*' // or 'image/jpeg,image/png'
      };
      if(extensions){
        accept.extensions = extensions;
      }
    }else{
      uploadType = "file";
      if(extensions){
        accept.title = '文件';
        accept.extensions = extensions;
      }else{
        accept = null;
      }
    }
    
    
    var dir = props.dir;
    var context = localStorage.context;
    var token = props.token;
    this.state = {
      uploadType:uploadType,
      accept:accept,
      fileSizeLimit:fileSizeLimit,
      label: label,
      dir: dir,
      context: context,
      token:token,
      isInit:false
    };
  }


  componentDidMount() {
    let t = this;
    var context = t.state.context;
    var param = {
      name: 'file',
      url: context + '/api/tb/crm/common/createFile',
      autoPending: true,
      accept: t.state.accept,
      multiple: false,
      limitNo: 1
    };

    const up = new UploadCore(param);
    up.on(Events.FILE_UPLOAD_PREPARING, (request) => {
        request.setHeader("Authorization", "Bearer "+t.state.token);
        request.setParam('dir', t.state.dir);
        request.setParam('token', t.state.token);
      })
      .on(Events.QUEUE_FILE_ADDED, (file) => {
        console.info('queuefileadded', file);
        file.session().progress((e) => {
          console.info('progress', e);
        }).fail((error) => {
          console.info(error)
        }).done((response) => {
          console.info(response.getJson())
        });
      })
      .on(Events.FILE_UPLOAD_ERROR, (error) => {
        if(error.name=='AbortError'){//网络中断
          Toast.show({
            type: 'error',
            content: '网络中断！',
          });
          return false;
        }else if(error.name=='TimeoutError'){//网络超时
          Toast.show({
            type: 'error',
            content: '网络中断！',
          });
          return false;
        }else if(error.name=='NetworkError'){//网络错误
          Toast.show({
            type: 'error',
            content: '网络错误！',
          });
          return false;
        }else{
          Toast.show({
            type: 'error',
            content: '上传失败！',
          });
          return false;
        }
      })
      .on(Events.QUEUE_ERROR, (error) => {
        var accept = t.state.accept;
        var fileSizeLimit = t.state.fileSizeLimit
        if(error.name=='FilterError'){//过滤文件报错
          if(accept){//扩展名出错
            var extensions = accept.extensions;
            if(extensions.indexOf(error.file.ext)<0){
              Toast.show({
                type: 'error',
                content: '文件类型错误！',
              });
              return false;
            }
          } else if(fileSizeLimit>0){
            if(error.file.size>fileSizeLimit){
              fileSizeLimitName = t.calculate(fileSizeLimit);
              Toast.show({
                type: 'error',
                content: '文件不能大于'+fileSizeLimitName+'！',
              });
              return false;
            }
          } else {
            Toast.show({
              type: 'error',
              content: '文件不能重复！',
            });
            return false;
          }
        } else {
          Toast.show({
            type: 'error',
            content: '上传失败！',
          });
          return false;
        }
      })
      .on(Events.FILE_UPLOAD_COMPLETED, (file) => {
        if (file.getStatus() === Status.SUCCESS) {
          var result = file.response.getJson();
          if (result.code == -1) {
            alert(result.message);
          } else {
            var json = file.response.getJson().data[0];
            t.props.onChange(json);
          }
        } else {
          // var json = [ {
          //   "fileName" : "d33087332a6c477a806d823209fef5c7.png",
          //   "previewUrl" : null,
          //   "fileDisplayName" : "1511353597(1).png",
          //   "downloadUrl" : "/attachment/download?fid=402887dc630ba7e701630bb4fe8f0011&chksum=04c8e2fdbb7ec02bc3492f9c98fa8e36",
          //   "imageSmallerUrl" : "/attachment/dingding/201804/d33087332a6c477a806d823209fef5c7_sm.png",
          //   "imageMiddleUrl" : "/attachment/dingding/201804/d33087332a6c477a806d823209fef5c7_mid.png",
          //   "fileExt" : ".png",
          //   "delFlag" : "0",
          //   "fileModule" : null,
          //   "multiCorpId" : false,
          //   "previewDate" : null,
          //   "imediaUrl" : "/attachment/dingding/201804/d33087332a6c477a806d823209fef5c7.png",
          //   "fileSize" : 67577,
          //   "fileDisplayNameNoExt" : "1511353597(1)",
          //   "relativePath" : "dingding/201804",
          //   "isEncrypted" : 0,
          //   "imageUrl" : "/attachment/image?fid=402887dc630ba7e701630bb4fe8f0011&chksum=04c8e2fdbb7ec02bc3492f9c98fa8e36",
          //   "checksum" : "04c8e2fdbb7ec02bc3492f9c98fa8e36",
          //   "deleteUrl" : "/attachment/delete?fid=402887dc630ba7e701630bb4fe8f0011&chksum=ef9f55278b3594f3eaefef23feacaa7d",
          //   "id" : "402887dc630ba7e701630bb4fe8f0011",
          //   "contentType" : null
          // } ];
          // var img = json;
          // //var checksum = json[0].checksum;
          // var initList = t.props.initList;
          // initList = initList.concat(img);
          alert('上传失败');
        }
      });

    const picker = up.getPickerCollector();
    $("#clickArea").html('');
    picker.addArea(document.getElementById("clickArea"));
  }

    //计算大小
  calculate(no){
    let a = no/1024;
    if(a<1){
      return no+'B';
    }
    let b = a/1024;
    if(b<1){
      return Math.round(a*100)/100+'KB';
    }
    return Math.round(b*100)/100+'MB';
  }

  render() {
    let t = this;
    let hiddenDivStyle = { width: '180px', height: '80px', display: 'none', paddingLeft: '1000px' }
    return (
      <div>
        
      </div>
    );
  }
}

