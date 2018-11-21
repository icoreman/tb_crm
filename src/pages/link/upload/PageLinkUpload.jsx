import { Component,LogicRender } from 'refast';
import { UploadCore, Events, Status, VERSION } from 'uploadcore';
import { hashHistory } from 'react-router';
import {
    Button,
    Toast,
    Dialog,
    Boxs
} from 'saltui';

import './PageUploadLink.less';

const {
  HBox,VBox,Box
} = Boxs;

export default class PageUploadLink extends Component {


    constructor(props) {
      super(props);
      const keyNum = this.GenNonDuplicateID(8);
      let winHeight =  getScrollHigh(0, 0, 0);
      this.state = {
        keyNum: keyNum,
        winHeight: winHeight
      }
    }

    componentDidMount() {
      const t = this;
      const context = localStorage.context;
      var param = {
        name: 'file',
        url: context + '/api/tb/crm/common/createFile',
        autoPending: true,
        accept: {
          title: '图片',
          extensions: 'jpg,jpeg,png,gif,webp,bmp'
        },
        multiple: false,
        limitNo: 1
      };

      const up = new UploadCore(param);
      up.on(Events.FILE_UPLOAD_PREPARING, (request) => {
          request.setHeader("Authorization", "Bearer "+ localStorage.token);
          request.setParam('dir', 'dist/image');
          request.setParam('token', localStorage.token);
        })
        .on(Events.QUEUE_FILE_ADDED, (file) => {
          console.info('queuefileadded', file);
          file.session().progress((e) => {
            console.info('progress',  e);
            Toast.show({
              type: 'loading',
              content: '已上传:' + e.percentage + '%'
            });
          }).fail((error) => {
            Toast.hide();
          }).done((response) => {
            Toast.hide();
            console.info(response.getJson());
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
          var accept = 'image';
          var fileSizeLimit = 2048;
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
              t.onChange(json);
            }
          } else {
            alert('上传失败');
          }
        });

        const picker = up.getPickerCollector();
        t.area = picker.addArea(document.getElementById('uploadPic' + t.state.keyNum));
    }

    componentWillUnmount() {
      this.area.destroy();
      Toast.hide();
    }

    GenNonDuplicateID(randomLength){
     return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
    }

    onChange = (value) => {
      var fid = value.id;
      var checksum = value.checksum;
      hashHistory.push('link/scan?fid=' + fid + '&checksum=' + checksum);
    }

    clickUpload = () => {
      $("input[type='file']").click();
      $("input[type='file']").click();
    }

    render() {
      const t = this;
      const style= {  'height': t.state.winHeight }
      return (
        <VBox vAlign="center" style={ style }>
          <Button onClick={ t.clickUpload } type="primary">
            上传名片
          </Button>
          <div id={'uploadPic' + t.state.keyNum} className="t-DN">
          </div>
        </VBox>
      )
    }
}

