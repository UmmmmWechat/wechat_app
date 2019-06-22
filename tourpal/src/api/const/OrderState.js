const states = {
  WAITING: 'WAITING',
  ONGOING: 'ONGOING',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
  FINISHED: 'FINISHED', // 只有通过 反馈触发 | 主动反馈 或者 ongoing超时系统自动反馈
  TIMEOUT: 'TIMEOUT', // waiting 过一段时间
  ALL: 'ALL'
}
const statePrompts = {};
statePrompts[states.WAITING] = '等待中';
statePrompts[states.ONGOING] = '进行中';
statePrompts[states.REJECTED] = '已拒绝';
statePrompts[states.CANCELED] = '已取消';
statePrompts[states.FINISHED] = '已完成';
statePrompts[states.TIMEOUT] = '超时';
statePrompts[states.ALL] = '所有类型';
states.statePrompts = statePrompts;

module.exports = states;
