<!-- 包装了微信原装组件 -->
<!-- 事件有 on-change -->
<template>
  <div>
    <span>{{label}}：</span>
    <div style="display: inline-block">
      <picker mode="multiSelector" @cancel="bindCancel" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="selectIndex" :range="selectArray">
      <span
        class="underline-span">
      {{showArray[0][showIndex[0]]}}&nbsp;-&nbsp;{{showArray[1][showIndex[1]]}}
      </span>
      </picker>
    </div>
  </div>
</template>

<script>
  import {AVAILABLE_PROVINCE_ARRAY, AVAILABLE_CITY_ARRAY} from '../../api/const/spotConst'

  export default {
    name: 'DLocationPicker',
    props: {
      label: {
        type: String,
        default: '旅游地点'
      },
      location: {
        type: Object,
        default: undefined
      }
    },
    data () {
      let showIndex = [0, 0];
      if (this.location) {
        showIndex = [];
        const provinceCount = AVAILABLE_PROVINCE_ARRAY.length;
        for (let i = 0; i < provinceCount; i++) {
          if (AVAILABLE_PROVINCE_ARRAY[i] === this.location.province) {
            showIndex[0] = i;
            break;
          }
        }
        const cities = AVAILABLE_CITY_ARRAY[AVAILABLE_PROVINCE_ARRAY[showIndex[0]]];
        const cityCount = cities.length;
        for (let i = 0; i < cityCount; i++) {
          if (cities[i] === this.location.city) {
            showIndex[1] = i;
            break;
          }
        }
      }

      let showArray = [AVAILABLE_PROVINCE_ARRAY, AVAILABLE_CITY_ARRAY[AVAILABLE_PROVINCE_ARRAY[showIndex[0]]]];

      return {
        showIndex,
        showArray,
        selectArray: [...showArray],
        selectIndex: [...showIndex]
      }
    },
    methods: {
      bindMultiPickerChange (e) {
        const value = e.target.value;
        console.log(this.name, 'bindMultiPickerChange 携带值为', value);
        this.showArray = [...this.selectArray];
        this.showIndex = value;
        this.$emit('on-change', {
          province: this.getProvince(),
          city: this.getCity()
        });
      },
      bindMultiPickerColumnChange (e) {
        const columnIndex = e.target.column;
        const value = e.target.value;
        console.log(this.name, 'bindMultiPickerColumnChange 修改的列为', columnIndex, '，值为', value);
        if (columnIndex === 0) {
          this.selectArray[1] = AVAILABLE_CITY_ARRAY[AVAILABLE_PROVINCE_ARRAY[value]];
          this.selectIndex = [value, 0];
        } else if (columnIndex === 1) {
          this.selectIndex = [this.selectIndex[0], value];
        }
      },
      bindCancel () {
        console.log(this.name, 'bindCancel');
        this.selectIndex = [...this.showIndex];
        this.selectArray = [...this.showArray];
      },
      getCitySpan () {
        console.log('getCitySpan')
        return `${this.getProvince()} ${this.getCity()}`;
      },
      getProvince () {
        return this.showArray[0][this.showIndex[0]];
      },
      getCity () {
        return this.showArray[1][this.showIndex[1]];
      }
    }
  }
</script>

<style scoped>
  .underline-span {
    border-bottom: thin solid white;
  }
</style>
