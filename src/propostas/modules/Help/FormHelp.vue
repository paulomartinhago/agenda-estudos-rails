<template>
    <a class="amazing-tooltip">
        <icon name="question-circle"></icon>
        <span class="help-size">
            <strong>{{ title }}</strong>
            <br>{{ description }}
        </span>
    </a>
</template>

<script>
    export default {
        props: ['title', 'description']
    }
</script>
