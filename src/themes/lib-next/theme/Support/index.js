/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 技术支持
 */
import React, { Component } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import './style.css';
import { Modal } from 'antd';
import qqImg from './qq-qr.png';
import xzsImg from './xzs-qr.png';

class Support extends Component {
    state = {
        visble: false,
        qqImg: qqImg,
        xzsImg: xzsImg
    };
    constructor(props) {
        super(props);
    }
    showModal() {
        this.setState({ visble: true });
    }
    closeModal() {
        this.setState({ visble: false });

    }
    render() {
        const { visble } = this.state;
        const { label } = this.props;
        return (
            <div className='navbar__item support '>
                <span className='text' onClick={this.showModal.bind(this)}>{label}</span>
                <Modal title="技术支持" width="400px" visible={visble} footer={null} destroyOnClose={true} maskClosable={false} centered={ true} onCancel={this.closeModal.bind(this)}>
                    <div className="container">
                        <h3 className='title'>加入交流群或添加小助手获取技术支持</h3>
                        <div className='flex'>
                            <div className='box'>
                                <div className='img-wrap'>
                                    <img src={qqImg} className='qq' />
                                </div>
                                <p>
                                    技术交流群
                                </p>
                            </div>
                            <div className='box'>
                                <div className='img-wrap'>
                                    <img src={xzsImg} className='xzs' />
                                </div>
                                <p>
                                    开发小助手
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Support;
