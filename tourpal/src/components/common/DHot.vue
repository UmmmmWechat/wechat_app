<template>
    <span class="DRating__wrapper">
        <span
        v-for="(item, index) in fires"
        class="DRating__star" 
        v-bind:class="{'DRating__star--full': item}"
        v-bind:key="index">
            {{fire}}
        </span>
    </span>
</template>

<script>
const levelTable = [
    0,
    1000,
    2000,
    3000,
    4000,
    Number.MAX_VALUE
];
function calcLevel(hot) {
    let level = 0;
    for (; level < levelTable.length; level++) {
        if (hot <= levelTable[level]) {
            break;
        }
    }
    console.log("level" + level);
    return level;
}
export default {
    props: {
        hot: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            fire: "🔥",
            fires: []
        }
    },
    mounted() {
        const rating = calcLevel(this.hot);
        const fires = Array(rating).fill(true);
        const empty = Array(5 - rating).fill(false);
        this.fires = [...fires, ...empty];
    }
}
</script>

<style>
.DRating__wrapper {
    font-size: 0.8em;
}

.DRating__star {
    margin-right: -5px;
    opacity: 0.2;
}
.DRating__star--full {
    opacity: 1;
}
</style>
