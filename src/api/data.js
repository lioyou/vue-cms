//数据容器
export default {
  login: false,
  tab: {
    editableTabsValue: '0', //当前激活的Tab
    editableTabs: [], //所有Tab
    tabIndex: 0,
  },
  table: {
    tables: {}, //保存表单数据
    pageSize: 10,
    currentPage: 1,
    selects: {}, //保存用户选择
  }
}
