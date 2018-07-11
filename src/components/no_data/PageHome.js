import './PageHome.less';
import { Boxs } from 'saltui';
const { VBox, Box } = Boxs;


export default () => (
        <div className="nodata-wrapper" style={{marginTop:50}}>
            <VBox vAlign="center" hAlign="center" className="nodata">
                <Box>
                  <i className="iconfont icon-no-data t-FCc" style={{fontSize:42}}></i>
                </Box>
                <Box className="t-FCc t-MT20 t-FS12"> 
                    暂无数据
                </Box>
            </VBox>
        </div>  	
    );



