import { Message, MessageBox } from 'element-ui';

export default {
  error(text) {
    Message.closeAll();
    Message({
      showClose: true,
      message: text,
      type: 'error',
      duration: 2000,
    });
  },
  success(text = '操作成功') {
    Message.closeAll();
    Message.success(text);
  },
  confirm(content, title = '提示', option = {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false,
    closeOnPressEscape: false,
  }) {
    return new Promise((resolve) => {
      MessageBox.confirm(content, title, option).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    });
  },
  alert(content, title = '提示', option = {
    confirmButtonText: '确定',
    type: 'warning',
    closeOnClickModal: false,
  }) {
    return MessageBox.alert(content, title, option);
  },
};
