<template>
    <div class="base-table">
        <el-table
                v-bind="$attrs"
                header-row-class-name="table-header"
                :data="data"
                style="width: 100%">
            <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    show-overflow-tooltip
            ></el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
	    props: {
		    data: {
			    type: [Array],
			    default: function () {
				    return []
			    }
		    },
		    columns: {
			    type: [Array],
			    default: function () {
				    return []
			    }
		    }
	    },
	    data () {
		    return {}
	    },
	    methods: {}
    }
</script>
<style lang="less">
    // 不同状态的表格变色
    .el-table {
        .el-table__body-wrapper {
            .warning-row {
                background: oldlace;
            }
        }
    }

    .base-table {
        .table-header th {
            // background-color: #E8EAED;
            background-color: #E8EAEF;
            border: none;
            font-weight: 600;

            .cell {
                border-right: 1px solid #fff;
            }
        }

        .el-input {
            cursor: text;
        }

        .el-table__expand-column,
        .el-table__expand-column .cell {
            visibility: hidden;
            width: 0 !important;
            padding: 0 !important;
        }

        .el-table__expanded-cell {
            padding-left: 10px;
        }

        .el-button--text {
            user-select: text;
        }
    }
</style>
