// import http, {AXIOS_CONFIG} from '../axios'
import http,{AXIOS_CONFIG} from '../axios'
// 获取用户权限
const getPermissions = (params) => {
	return http.get('/User/getPermissions', {params})
}

// 获取看板数据
const getDashboard = (params) => {
	return http.get('/Employ/dashboard', {params})
}

const getPlanList = (params) => {
	return http.get('/Employ/getPlanList', {params})
}

const getPlanInfo = (params) => {
	return http.get('/Employ/getPlanInfo', {params})
}

const savePlan = (params) => {
	return http.post('/Employ/batchSavePlan', params)
}

// 获取岗位计划日志列表
const getPlanLogList = (params) => {
	return http.get('/Employ/getPlanLogList', {params})
}
// 获取岗前日志列表
const getEmployBeforeLogList = (params) => {
	return http.get('/Employ/getEmployBeforeLogList', {params})
}
// 获取岗后日志列表
const getEmployAfterLogList = (params) => {
	return http.get('/Employ/getEmployAfterLogList', {params})
}

// 获取岗位计划列表
const getEmployPlanList = (params) => {
	return http.get('/Employ/getPlanList', {params})
}

// 获取岗前进展详情
const getEmployBeforeInfo = (params) => {
	return http.get('/Employ/getEmployBeforeInfo', {params})
}
// 获取岗后进展详情
const getEmployAfterInfo = (params) => {
	return http.get('/Employ/getEmployAfterInfo', {params})
}

// 编辑岗前进展
const saveEmployBefore = (params) => {
	return http.post('/Employ/saveEmployBefore', params)
}

// 编辑岗前进展
const saveEmployAfter = (params) => {
	return http.post('/Employ/saveEmployAfter', params)
}

const Employ = {
	getDashboard,
	getPlanList,
	getPlanInfo,
	savePlan,
	getPlanLogList,
	getEmployBeforeLogList,
	getEmployAfterLogList,
	getEmployPlanList,
	getEmployBeforeInfo,
	getEmployAfterInfo,
	saveEmployBefore,
	saveEmployAfter
}
const User = {
	getPermissions
}
export default {
	Employ,
	User
}
