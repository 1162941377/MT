/* eslint-disable func-names */
/**
 * 自行获取 el-submenu__title 标签，对其修改样式
 */
export default function handle() {
  const lis = document.getElementsByClassName('el-submenu__title');
  for (let i = 0; i < lis.length; i += 1) {
    lis[i].onmousemove = function () {
      this.style.color = '#fe8c00';
      this.style.transform = 'scale(0.95)';
    };
    lis[i].onmouseout = function () {
      this.style.color = '#909399';
      this.style.transform = 'scale(1)';
    };
  }
}
