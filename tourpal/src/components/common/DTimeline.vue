<!-- 要求 event 格式
{
date: String,
content: String
}
-->
<template>
  <div>
    <ul id="time-line">
      <li
        class="time-line-item"
        v-for="(event, index) in events"
        :key="event.date + index">
        <div>
          <div class="date-div">{{ event.date }}</div>
          <div class="item-content">{{ event.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      events: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  #time-line {
    margin-left: 40px;
  }

  .time-line-item {
    padding: 20px 20px 60px 40px;
    border-left: rgba(0, 0, 0, 0.1) 4px solid;
  }

  .time-line-item::before {
    position: relative;
    display: inline-block;
    content: '';
    border-radius: 50%;
    background-color: #42b970;
    height: 40px;
    width: 40px;
    left: -62px;
  }

  .date-div {
    font-size: 1.2em;
    font-weight: bold;
  }

  .item-content {
    color: gray;
    word-wrap: break-word;
    text-align: justify;
  }
</style>
