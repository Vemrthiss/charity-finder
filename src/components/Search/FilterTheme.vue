<template>
    <li class="search__filter-item" @click="removeThemeQuery">
        <span class="search__filter-item-name">{{ theme }}</span>
        <div class="search__filter-item-circle"></div>
    </li>
</template>

<script>
    export default {
        props: {
            theme: String
        },
        methods: {
            removeThemeQuery($event) {
                this.$emit('remove-theme', $event.target.textContent);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search {
        &__filter-item {
            margin: .5rem;
            padding: .7rem 0;
            padding-right: 1rem;
            clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
            background: linear-gradient(to right, var(--color-green-primary), var(--color-green-secondary));
            cursor: pointer;
            position: relative; // for abs pos of before pseudo element

            &:hover {
                background: linear-gradient(to right, var(--color-red-primary), var(--color-purple-primary));
                color: white;

                &::before {
                    opacity: 1;
                    transform: translate(-70%, -50%);
                }

                .search__filter-item-name {
                    opacity: 0;
                    transform: translateY(-3rem);
                }
            }

            &::before {
                content: "Remove";
                text-transform: uppercase;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-70%, 50%);
                opacity: 0;
                transition: all .3s;
            }
        }

        &__filter-item-name {
            margin: 0 .5rem;
            display: inline-block;
            opacity: 1;
            transform: translateY(0);
            transition: all .3s;
            min-width: 5rem;
        }

        &__filter-item-circle {
            height: 1rem;
            width: 1rem;
            background-color: white;
            display: inline-block;
            border-radius: 50%;
        }
    }
</style>