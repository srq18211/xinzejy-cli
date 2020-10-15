<template>
        <el-pagination
				v-bind="$attrs"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="$attrs.currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
</template>

<script>
	export default {
		name: 'basePagination',
		data () {
			return {
				form: {
					page: '',
					pageSize: ''
				}
			}
		},
		methods: {
			handleSizeChange (val) {
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange (val) {
				console.log(`当前页: ${val}`)
			},
			currentPage () {

			}
		}
	}
</script>

<style scoped>

</style>
