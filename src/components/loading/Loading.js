import {loadingIcon} from '../../app/variables';

export default ({ list, onClick }) => (
  <div>
    <img width="30px" height="30px" src={loadingIcon}/><br/>
    加载中...
  </div>
);
