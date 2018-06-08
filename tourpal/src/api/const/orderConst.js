const WAITING = 'WAITING';
const ONGOING = 'ONGOING';
const REJECTED = 'REJECTED';
const CANCELED = 'CANCELED';
const FINISHED = 'FINISHED';
const TIMEOUT = 'TIMEOUT'; // 只有通过 反馈触发 | 主动反馈 或者 ongoing超时系统自动反馈
const ALL = 'ALL'; // waiting 过一段时间

export {
    WAITING,
    ONGOING,
    REJECTED,
    CANCELED,
    FINISHED,
    TIMEOUT
}