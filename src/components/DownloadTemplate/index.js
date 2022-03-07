/**
 * @file download
 * @author lijianan
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import 'antd/dist/antd.min.css';


export default class Download extends Component {

    static propTypes = {
        /** 显示文案 */
        text: PropTypes.string.isRequired,
        /** 下载按钮类型，参考antd button */
        type: PropTypes.string.isRequired,
        /** 后端服务 */
        service: PropTypes.string.isRequired,
        /** 接口 */
        url: PropTypes.string.isRequired,
        /** 参数集合 */
        params: PropTypes.object.isRequired
    };

    static defaultProps = {
        text: '下载',
        type: 'link',
        service: 'service',
        url: '/api/download/exportTemplate',
        params: { type: 15 }
    }

    getDevHost = () => {
        let devHost = window.location.host.replace(host, '');
        if (devHost.indexOf(':') != -1) {
            devHost = devHost.substr(0, devHost.indexOf(':'));
        }
        if (devHost == 'dev') {
            devHost = PROXY || 't2';//todo:需要添加或替换环境变量
        }
        return devHost;
    }

    listExport = (url, data, serviceName = 'service') => {
        // let host = this.getDevHost();
        url = '/service/' + serviceName + url;
        var oForm = document.createElement("form");
        oForm.id = "export_form";
        oForm.method = "post";
        oForm.action = url;
        oForm.target = "_blank";
        document.body.appendChild(oForm);
        var oInput;
        for (var obj in data) {
            oInput = document.createElement("input");
            oInput.type = 'text';
            oInput.name = obj;
            oInput.value = data[obj];
            oForm.appendChild(oInput);
        }
        document.getElementById('export_form').submit();
        document.getElementById('export_form').remove();
    }

    onClick = () => {
        const { service, url, params } = this.props;
        this.listExport( url, params, service);
    }

    render() {
        const { text, type } = this.props;
        return (
            <Button onClick={this.onClick} type={type}>{text}</Button>
        );
    }
}
