import './NoData.less';
import { Boxs } from 'saltui';
const { VBox, Box } = Boxs;
import { noDataImage } from '../../app/variables';

export default () => (
        <div className="nodata-wrapper" style={{marginTop:50}}>
            <VBox vAlign="center" hAlign="center" className="nodata">
                <Box>
                  <img width="160" height="160" src="https://img.alicdn.com/tps/TB1K6mHNpXXXXXiXpXXXXXXXXXX-1000-1000.svg"/>
                </Box>
                <Box className="t-FCc t-MT20 t-FS12"> 
                    暂无数据
                </Box>
            </VBox>
        </div>  	
    );



