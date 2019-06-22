<template>
    <span class="DRating__wrapper">
        <span
        v-for="(item, index) in stars"
        class="DRating__star" 
        v-bind:class="{'DRating__star--full': !!item}"
        v-bind:key="index">
            {{star}}
        </span>
    </span>
</template>

<script>
export default {
    props: {
        rating: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            star: "⭐",
            stars: []
        }
    },
    mounted() {
        const rating = this.rating;
        const stars = Array(rating).fill("⭐");
        const empty = Array(5 - rating).fill("");
        this.stars = [...stars, ...empty];
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
