import React from 'react';
import { Layout } from 'antd';
import styles from './HeaderFooter.less';

const { Footer } = Layout;
const MainFooter = () => (
  <>
    <Footer  style={{ textAlign: 'center' }}>
    <div className={styles.normal}>
      <ul className={styles.list}>
        <p>京ICP备19054731号 © 2019 - 2020 panfp.cn 版权所有</p>
      </ul>
    </div>
    </Footer>
  </>
);

export default MainFooter;
