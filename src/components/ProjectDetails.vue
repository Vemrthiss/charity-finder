<template>
    <div class="project-detail__overlay" @click="closeOverlayExternal">
        <transition enter-active-class="animate__animated animate__zoomInDown" leave-active-class="animate__animated animate__zoomOutDown">
            <div class="project-detail" ref="content" v-if="enterNow">
                <button @click="closeOverlay" class="btn project-detail__close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x project-detail__icon" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                </button>

                <h1 class="project-detail__header">{{ details.title }}</h1>

                <div class="project-detail__body">
                    <div class="project-detail__problem">
                        <p class="project-detail__title project-detail__problem-title">Problem</p>
                        <p class="project-detail__problem-content">{{ details.need }}</p>
                    </div>

                    <div class="project-detail__summary" v-if="onLaptop">
                        <p class="project-detail__title project-detail__summary-title">Summary</p>
                        <p class="project-detail__summary-content">{{ details.summary }}</p>
                    </div>

                    <div class="project-detail__donation">
                        <p class="project-detail__title project-detail__donation-title">Donation options</p>
                        <ul class="project-detail__donation-options">
                            <li class="project-detail__donation-option" v-for="(donation, index) of details.donationOptions.donationOption" :key="index">
                                <span class="project-detail__donation-amount">${{ donation.amount }}</span>
                                <span class="project-detail__donation-description">{{ donation.description }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="project-detail__additional-info" v-if="onLaptop">
                    <div class="project-detail__organisation">
                        <div class="project-detail__organisation-main">
                            <span class="project-detail__organisation-name">Organisation:</span>
                            <a class="project-detail__organisation-link" :href="details.organization.url">{{ details.organization.name }}</a>
                        </div>
                        <p class="project-detail__organisation-location">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin project-detail__icon" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="12" cy="11" r="3" />
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                            </svg>
                            {{ details.organization.city }}, {{ details.organization.country }}
                        </p>
                    </div>
                    
                    <div class="project-detail__project-links">
                        <a class="project-detail__project-link" :href="details.projectLink">Project Link</a>
                        <a class="project-detail__project-link" :href="details.additionalDocumentation" v-if="details.additionalDocumentation">Additional documentation</a>
                    </div>
                </div>

                <template v-else>
                    <div class="project-detail__organisation">
                        <div class="project-detail__organisation-main">
                            <span class="project-detail__organisation-name">Organisation:</span>
                            <a class="project-detail__organisation-link" :href="details.organization.url">{{ details.organization.name }}</a>
                        </div>
                        <p class="project-detail__organisation-location">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin project-detail__icon" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="12" cy="11" r="3" />
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                            </svg>
                            {{ details.organization.city }}, {{ details.organization.country }}
                        </p>
                    </div>
                    
                    <div class="project-detail__project-links">
                        <a class="project-detail__project-link" :href="details.projectLink">Project Link</a>
                        <a class="project-detail__project-link" :href="details.additionalDocumentation" v-if="details.additionalDocumentation">Additional documentation</a>
                    </div>
                </template>
                                
                <ul class="project-detail__themes">
                    <li v-for="theme of details.themes.theme" :key="theme.id">{{ theme.name }}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            details: Object,
            onLaptop: Boolean
        },
        data: function() {
            return {
                enterNow: false
            }
        },
        methods: {
            async closeOverlay() {
                const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
                this.enterNow = false;
                await wait(1000);
                this.$emit('close-overlay');
                
            },
            closeOverlayExternal($event) {
                if (!this.$refs.content.contains($event.target)) { //checks if user clicks an area NOT inside the main body/content div
                    this.closeOverlay(); //close overlay if user clicks outside content box
                }
            }
        },
        created() {
            setTimeout(() => {this.enterNow = true}, 50); // to allow transition tag on content body
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/mixins.scss";

    .project-detail__overlay {
        background-color: rgba(0,0,0, .8);
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;

        @supports (backdrop-filter: blur(10px)) {
            backdrop-filter: blur(10px);
            background-color: rgba(0,0,0, .5);
        }
    }

    .project-detail {
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%;
        border-radius: 2rem;
        padding: 1rem;

        @include respond-tab {
            width: 85%;
        }

        @include respond-laptop {
            width: 70%;
        }

        &__icon {
            width: 2.6rem;
            height: 2.6rem;
            position: relative;
        }

        &__close {
            background-color: white; //background colour of content body
            border-radius: inherit;
            position: absolute;
            top: 3px;
            right: 3px;
            padding: 0;
            transition: all .3s;

            @include respond-laptop {
                top: 6px;
                right: 6px;
            }

            &:hover {
                transform: scale(1.2);
            }

            &:active {
                transform: scale(1.05);
            }
        }

        &__header {
            font-size: 2.4rem;
            padding: 0 1rem;
        }

        &__body {
            @include respond-laptop {
                display: flex;
                justify-content: space-between;
            }

            & > * {
                @include respond-laptop {
                    width: 30%;
                }
            }
        }

        &__title {
            text-transform: uppercase;
            display: inline-block;
            margin: 0;
            position: relative;

            &::after {
                content: "";
                height: 1.5px;
                background-color: #eeeeee;
                width: 125%;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                z-index: 100;
            }
        }

        &__donation-options {
            margin-top: 1rem;
            list-style: none;
            padding: 0;
        }

        &__donation-option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 1rem;
        }

        &__donation-amount {
            font-weight: 700;
            margin-right: 3rem;
        }

        &__additional-info { //only rendered on laptops and up
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 2rem 0;
        }

        &__organisation {
            display: flex;
            justify-content: space-between;
            align-items: center;

            @include respond-laptop {
                display: block;
            }
        }

        &__organisation-name {
            display: block;

            @include respond-laptop {
                display: inline;
                margin-right: .8rem;
            }
        }

        &__organisation-location { //to vertically center svg
            display: flex;
            align-items: center;
        }

        &__project-links {
            display: flex;
            justify-content: space-between;

            @include respond-laptop {
                display: block;
            }
        }

        &__project-link {
            @include respond-laptop {
                display: block;
                margin: 1rem 0;
            }
        }
    }
</style>