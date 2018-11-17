import React from 'react';
import { Form, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import QueryPage from './../../../components/QueryPage/QueryPage';
import AdminForm from './AdminForm';
import { ADMIN } from './../../../common/actions';
@Form.create()
@connect((state) => ({
    adminList: state.admin.adminList || []
}))
export default class AdminQueryPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editActive: false,
            currentAdmin: {}
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: ADMIN.QUERY_LIST_ACTION,
            params: {
                currentPage: this.state.currentPage,
            }
        })
    }

    handleEdit(values) {
        console.log(values)
    }
    handleDisable(values) {
        console.log(values)
    }

    render() {
        const queryPageConfig = {
            searchUrl: '/search',
            searchFields: ['name', 'email', 'birthDay', 'userStatus'],
            tableColumns: ['name', 'email', 'birthDay', 'userStatus'],
            topButtons: [
                {
                    buttonName: '新增',
                    title: '新增管理员',
                    englishName: 'add',
                    openType: 'modal',
                    modalForm: AdminForm,
                    requestUrl: '/test',
                }
            ],
            lineButtons: [
                {
                    buttonName: '修改',
                    title: '信息修改',
                    openType: 'modal',
                    modalForm: AdminForm,
                    requestUrl: '/test',
                    action: this.handleEdit
                },
                {
                    buttonName: '禁用',
                    openType: 'confirm',
                    title: '确认禁用',
                    message: '确定禁用此用户？',
                    requestUrl: '/test',
                    action: this.handleDisable
                }
            ]
        };
        return (
            <React.Fragment>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>主页</Breadcrumb.Item>
                    <Breadcrumb.Item>账户</Breadcrumb.Item>
                    <Breadcrumb.Item>管理员</Breadcrumb.Item>
                </Breadcrumb>
                <QueryPage pageConfig = {queryPageConfig} dataSource={this.props.adminList}/>
            </React.Fragment>
        )
    }
}