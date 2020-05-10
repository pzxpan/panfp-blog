import React from 'react';
import { Card, Divider, Icon, Layout, Tooltip } from 'antd';
import styles from './HeaderFooter.less';

const { Footer } = Layout;
const MainFooter = () => (
  <>
    <Footer  style={{ textAlign: 'center' }}>
      <Divider dashed style={{ marginBottom: 0 }}/>
      <div style={{ marginLeft: 10, fontSize: 16, marginTop: 10 }}>
        <Tooltip title="https://www.panfp.cn">
          <a href="https://www.panfp.cn" style={{ marginRight: 10 }}><Icon type="global"/></a>
        </Tooltip>
        <Tooltip title="https://github.com/pzxpan/panfp-blog">
          <a href="https://github.com/pzxpan/panfp-blog" style={{ marginRight: 10 }}><Icon type="github"/></a>
        </Tooltip>
      </div>
    <div className={styles.normal}>
      <ul className={styles.list}>
        <p>京ICP备19054731号 © 2019 - 2020 panfp.cn 版权所有</p>
      </ul>
    </div>
    </Footer>
  </>
);

export default MainFooter;
