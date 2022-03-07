import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import { Button, DownloadTemplate } from '@for-u';
import { DownloadProps } from './props';
import { Tabs } from 'antd';
import './index.css';
const { TabPane } = Tabs;

const App = () => (
    <Tabs defaultActiveKey="1">
        <TabPane tab="Button" key="1">
            <Button name="新按钮" />
        </TabPane>
        <TabPane tab="DownloadTemplate" key="2">
            <DownloadTemplate {...DownloadProps} />
        </TabPane>
        <TabPane tab="other" key="3">
            other...
        </TabPane>
    </Tabs>
);

ReactDOM.render(<App />, document.getElementById('root'));