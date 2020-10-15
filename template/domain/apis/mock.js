import Mock from 'mockjs'

Mock.setup({
	timeout: 800
})
Mock.mock(/Employ\/dashboard/, {
	'stat': 1,
	'msg': 'succ',
	'data': {
		
	}
})

Mock.mock(/Employ\/getEmployBeforeInfo/, {
	'stat': 1,
	'msg': 'succ',
	'data': {

	}
})
