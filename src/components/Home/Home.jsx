import React, { Component } from 'react';
import echarts from 'echarts';
import styles from './Home.less';

class Home extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption({
                tooltip: {},
                xAxis: {
                    data: ["创建中", "草稿", "发布", "停用"]
                },
                yAxis: {},
                series: [{
                    name: '比例/100',
                    type: 'bar',
                    data: [this.props.status.creating, this.props.status.save, this.props.status.publish, this.props.status.stop]
                }]
            });

            const myChart2 = echarts.init(document.getElementById('main2'));
            myChart2.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                series : [
                    {
                        name: '比例/100',
                        type: 'pie',
                        radius: '55%',
                        data:[
                            {value:this.props.status.creating, name:'创建中'},
                            {value:this.props.status.save, name:'草稿'},
                            {value:this.props.status.publish, name:'发布'},
                            {value:this.props.status.stop, name:'停用'}
                        ]
                    }
                ]
            });
        }, 50);
    }
    render() {
        console.log("home---------------------------------------")
        console.log(this.props.status)
        const data  = this.props.data;
        const status = this.props.status;
        const statusCreate = this.props.statusCreate;
        const statusSave = this.props.statusSave;
        const statusPublish = this.props.statusPublish;
        const statusStop = this.props.statusStop;
        return (
            <div>
                <div className={styles.home_div}>
                    <span className={styles.creating_home} onClick={() => statusCreate(data.id)}>{"创建中问卷"+status.creating}</span>
                    <span className={styles.save_home} onClick={() => statusSave(data.id)}>{"草稿问卷"+status.save}</span>
                    <span className={styles.publish_home} onClick={() => statusPublish(data.id)}>{"已发布问卷"+status.publish}</span>
                    <span className={styles.stop_home} onClick={() => statusStop(data.id)}>{"停止的问卷"+status.stop}</span>
                </div>
                <div id="main" className={styles.home_main}></div>
                <div id="main2" className={styles.home_main2}></div>
            </div>
        );
    }
}

export default Home;