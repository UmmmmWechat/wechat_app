<template>
  <div class="Calendar__wrapper">
    <div class="Calendar__toolbar">
      <span v-on:click="handleChangeMonth(-1)">{{"<"}}</span>
      <span>{{currentYear}}/{{currentMonth}}/{{currentDate}}</span>
      <span v-on:click="handleChangeMonth(1)">{{">"}}</span>
    </div>
    <div>

      <div class="Calendar__row">
        <span
          v-for="day in weekdays"
          v-bind:key="day"
          class="Calendar__weekday-item Calendar__grid-item" >{{day}}</span>
      </div>

      <div class="Calendar__body">
        <div v-for="(row, index) in rows" v-bind:key="index" class="Calendar__row">
          <span
            v-for="(day, idx) in row"
            v-bind:key="day"
            v-bind:class="{'Calendar__day--selected': day === currentDate}"
            class="Calendar__grid-item"
            v-on:click="handleClickDay(day)"
            >
            {{day}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DCalendar",
    data () {
      return {
        date: new Date(),
        rows: [[]],
        weekdays: ['日', '一', '二', '三', '四', '五', '六']
      }
    },
    created () {
      this.fillDay();
    },
    computed: {
      currentYear () {
        return this.date.getFullYear();
      },
      currentMonth () {
        return this.date.getMonth() + 1;
      },
      currentDate () {
        return this.date.getDate();
      }
    },
    methods: {
      fillDay () {
        const year = this.date.getFullYear();
        const month = this.date.getMonth();
        const dayCount = this.getDayOfMonth(year, month);
        let days = Array(dayCount)
          .fill(1)
          .map((_, index) => index + 1);
        let preBlankCount = new Date(year, month, 1).getDay();
        let postBlankCount = 6 - new Date(year, month + 1, 0).getDay();
        days = [...Array(preBlankCount).fill(""), ...days, ...Array(postBlankCount).fill("")];
        // 分组
        const rows = [];
        days.forEach((_, index) => {
          if (index % 7 === 0) {
            rows.push(days.slice(index, index + 7));
          }
        });
        this.rows = rows;
      },
      getDayOfMonth (year, month) {
        return new Date(year, month + 1, 0).getDate();
      },
      handleClickDay (day) {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), day);
      },
      handleChangeMonth (delt) {
        let year = this.date.getFullYear();
        let month = this.date.getMonth();
        let day = this.date.getDate();

        console.log(year, month, day);

        month += delt;
        if (month < 0) {
          month = 11;
          year--;
        } else if (month >= 12) {
          month = 1;
          year++;
        }

        const maxDay = this.getDayOfMonth(year, month);
        if (day > maxDay) {
          day = maxDay;
        }

        this.date = new Date(year, month, day);
        this.$nextTick(() => {
          this.fillDay();
        })
      }
    },
    watch: {
      date (newV) {
        console.log(newV);
        this.$emit("onChangeDay", newV);
      }
    }
  }
</script>

<style scoped>

  .Calendar__wrapper {
    background-color: #42b970;
    width: 100%;
    color: white;
  }

  .Calendar__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 100px;
    box-sizing: border-box;
  }

  .Calendar__weekday-item {
    font-weight: bold;
  }

  .Calendar__grid-item {
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
  }

  .Calendar__row {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .Calendar__body {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .Calendar__day--selected {
    /*border: white 1Px solid;*/
    border-radius: 50%;
    background-color: rgba(255,255,0, 0.5);
  }
</style>
