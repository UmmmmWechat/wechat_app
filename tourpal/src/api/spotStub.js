import * as mockData from './mock/spot_mock_data'
import * as constant from './const/spotConst'
import {mockSuccess} from './httpRequestApi'

const apiName = 'spotApiStub'

export default {

  /**
   * 打印信息的方法
   * @param {*} message
   * @param {*} optionalParams
   */
  dLog (message, ...optionalParams) {
    console.log(apiName, 'stub', message, optionalParams)
  },

  /**
   * 根据定位查询景点桩
   * @param {*} location
   * @param {int} lastIndex
   * @param {*} resolve
   * @param {*} reject
   */
  querySpots (location, lastIndex, resolve, reject) {
    this.dLog('querySpots 方法请求', 'location', location, `lastIndes: ${lastIndex}`)

    const totalSize = 2 * constant.SPOT_MAX_NUM
    const getAll = lastIndex === constant.GET_ALL_TAG
    const hasMoreSpot = !getAll && lastIndex < totalSize
    let spotList = []

    if (hasMoreSpot) {
      const mockSpot = mockData.mockSpot
      const size = getAll
        ? totalSize
        : (totalSize - lastIndex > constant.SPOT_MAX_NUM
          ? constant.SPOT_MAX_NUM
          : totalSize - lastIndex)
      for (let i = 0; i < size; i++) {
        let spotItem = {
          id: `spotID${lastIndex + i}`,
          name: mockSpot.name,
          location: mockData.mockLocation,
          pictureUrl: mockSpot.pictureUrl,
          introduction: mockSpot.introduction,
          recommendLevel: 1,
          popularity: 1
        }
        spotList.push(spotItem)
      }
    }

    mockSuccess(
      () => {
        resolve({spotList, hasMoreSpot})
      })
  },

  /**
   * 通过关键词和城市获取 spots 的方法桩
   * @param {*} keyword
   * @param {*} city
   * @param {*} lastIndex
   * @param {*} resolve
   * @param {*} reject
   */
  querySpotsByKeywordAndCity (keyword, city, lastIndex, resolve, reject) {
    this.dLog('querySpotsByKeywordAndCity 方法请求',
      'keyword', keyword, 'city', city, `lastIndes: ${lastIndex}`)

    const totalSize = 2 * constant.SPOT_MAX_NUM
    const getAll = lastIndex === constant.GET_ALL_TAG
    const hasMoreSpot = !getAll && lastIndex < totalSize
    let spotList = []

    if (hasMoreSpot) {
      const mockSpotList = mockData.mockSpotList
      const length = mockSpotList.length
      const size = getAll
        ? totalSize
        : (totalSize - lastIndex > constant.SPOT_MAX_NUM
          ? constant.SPOT_MAX_NUM
          : totalSize - lastIndex)
      for (let i = 0; i < size; i++) {
        const mockSpot = mockSpotList[i % length]
        let spotItem = {
          id: `spotID${lastIndex + i}`,
          name: `${keyword}:${mockSpot.name}`,
          location: mockData.mockLocation,
          pictureUrl: mockSpot.pictureUrl,
          introduction: mockSpot.introduction,
          recommendLevel: 1,
          popularity: 1
        }
        spotList.push(spotItem)
      }
    }

    mockSuccess(
      () => {
        resolve({spotList, hasMoreSpot})
      })
  },

  /**
   * 检查 location 是否在服务范围内的方法桩
   * @param {*} location
   * @param {*} resolve
   * @param {*} reject
   */
  checkLocationAvailable (location, resolve, reject) {
    this.dLog('querySpots 方法请求', 'location', location)
    resolve({isAvailable: true})
  }

}
