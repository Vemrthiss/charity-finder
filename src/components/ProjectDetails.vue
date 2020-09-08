<template>
    <div class="project-detail__overlay" @click="closeOverlayExternal">
        <transition enter-active-class="animate__animated animate__zoomInDown" leave-active-class="animate__animated animate__zoomOutDown">
            <div class="project-detail" ref="content" v-if="enterNow">
                <button @click="closeOverlay" class="btn project-detail__close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x project-detail__icon" viewBox="0 0 24 24" stroke-width="1.5" :stroke="iconColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                </button>

                <h1 class="project-detail__header">{{ details.title }}</h1>

                <div class="project-detail__body">
                    <div class="project-detail__problem">
                        <p class="project-detail__title project-detail__problem-title">Problem</p>
                        <p class="project-detail__content project-detail__content--problem">{{ details.need }}</p>
                    </div>

                    <div class="project-detail__summary" v-if="onLaptop">
                        <p class="project-detail__title project-detail__summary-title">Summary</p>
                        <p class="project-detail__content project-detail__content--summary">{{ details.summary }}</p>
                    </div>

                    <div class="project-detail__donation">
                        <p class="project-detail__title project-detail__donation-title">Donation options</p>
                        <ul class="project-detail__donation-options">
                            <li class="project-detail__donation-option project-detail__content project-detail__content--donation" v-for="(donation, index) of details.donationOptions.donationOption" :key="index">
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
                            <a class="project-detail__link project-detail__organisation-link" :href="details.organization.url">{{ details.organization.name }}</a>
                        </div>
                        <p class="project-detail__organisation-location">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin project-detail__icon project-detail__icon--location" viewBox="0 0 24 24" stroke-width="1.5" :stroke="iconColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="12" cy="11" r="3" />
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                            </svg>
                            {{ details.organization.city }}, {{ details.organization.country }}
                        </p>
                    </div>
                    
                    <div class="project-detail__project-links">
                        <a class="project-detail__link project-detail__project-link project-detail__project-link--project" :href="details.projectLink">Project Link</a>
                        <a class="project-detail__link project-detail__project-link" :href="details.additionalDocumentation" v-if="details.additionalDocumentation">Additional documentation</a>
                    </div>
                </div>

                <template v-else>
                    <div class="project-detail__organisation">
                        <div class="project-detail__organisation-main">
                            <span class="project-detail__organisation-name">Organisation:</span>
                            <a class="project-detail__link project-detail__organisation-link" :href="details.organization.url">{{ details.organization.name }}</a>
                        </div>
                        <p class="project-detail__organisation-location">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin project-detail__icon project-detail__icon--location" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="12" cy="11" r="3" />
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                            </svg>
                            {{ details.organization.city }}, {{ details.organization.country }}
                        </p>
                    </div>
                    
                    <div class="project-detail__project-links">
                        <a class="project-detail__link project-detail__project-link project-detail__project-link--project" :href="details.projectLink">Project Link</a>
                        <a class="project-detail__link project-detail__project-link" :href="details.additionalDocumentation" v-if="details.additionalDocumentation">Additional documentation</a>
                    </div>
                </template>
                                
                <ul class="project-detail__themes">
                    <li class="project-detail__theme" v-for="theme of details.themes.theme" :key="theme.id">
                        <span class="project-detail__theme-name">{{ theme.name }}</span>
                        <div class="project-detail__theme-circle"></div>
                    </li>
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
                enterNow: false,
                iconColor: '#f80759'
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
        background: var(--color-pink-secondary);  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, var(--color-pink-primary), var(--color-pink-secondary));  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, var(--color-pink-primary), var(--color-pink-secondary)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%;
        border-radius: 2rem;
        padding: 1rem;
        text-align: left;
        font-size: 1.6rem;
        max-height: 80vh;
        overflow: auto; //to enable scrolling within popup should content exceed max-height

        @include respond-tab {
            width: 85%;
        }

        @include respond-laptop {
            width: 70%;
            text-align: center;
            max-height: 90vh;
        }

        &__close {
            background-color: var(--color-pink-secondary); //background colour of content body
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
            text-align: center;
            letter-spacing: .8px;
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
            padding-bottom: .5rem;

            @include respond-laptop {
                padding-bottom: .3rem;
            }

            &::after {
                content: "";
                height: 1.5px;
                background-color: #eeeeee;
                width: 125%;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-40%);
                z-index: 100;

                @include respond-laptop {
                    transform: translateX(-50%);
                }
            }
        }

        &__content {
            line-height: 1.4;
        }

        &__donation-options {
            margin-top: 1rem;
            list-style: none;
            padding: 0;
        }

        &__donation-option {
            display: grid;
            grid-template-columns: 15% 1fr;
            justify-content: center;
            align-items: center;
            margin-top: 1rem;

            @include respond-laptop {
                grid-template-columns: 20% 1fr;
            }
        }

        &__donation-amount {
            font-weight: 700;
        }

        &__additional-info { //only rendered on laptops and up
            display: flex;
            justify-content: space-around;
            margin: 2rem 0;
        }

        &__organisation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 2rem 0;

            @include respond-laptop {
                display: block;
                margin: 0;
            }
        }

        &__organisation-name {
            display: block;

            @include respond-laptop {
                display: inline;
                margin-right: .8rem;
            }
        }

        &__organisation-link {
            display: inline-block;
        }

        &__organisation-location { //to vertically center svg
            display: flex;
            align-items: center;
        }

        &__project-links {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;

            @include respond-laptop {
                display: block;
                margin-top: 0;
            }
        }

        &__project-link {
            @include respond-laptop {
                display: block;
                margin: 1rem 0;
            }

            &--project {
                @include respond-laptop {
                    margin-top: 0;
                }
            }
        }

        &__themes {
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 1rem;
        }

        &__theme {
            margin: .5rem;
            padding: .7rem 0;
            padding-right: 1rem;
            clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
            color: white;
            background: var(--color-purple-primary);  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, var(--color-red-primary), var(--color-purple-primary));  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, var(--color-red-primary), var(--color-purple-primary)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

            cursor: pointer;
            transition: all .3s;

            &:hover {
                transform: rotate(-3deg) translateX(3px);
            }

            &:active {
                transform: rotate(-1deg) translateX(1px);
            }
        }

        &__theme-name {
            margin: 0 .5rem;
        }

        &__theme-circle {
            height: 1rem;
            width: 1rem;
            background-color: white;
            display: inline-block;
            border-radius: 50%;
        }

        &__icon {
            width: 2.6rem;
            height: 2.6rem;
            position: relative;
        }

        &__link {
            text-decoration: none;
            transition: all .3s;
            
            &:link {
                color: var(--color-red-primary);
            }

            &:visited {
                color: var(--color-purple-primary);
            }

            &:hover {
                transform: scale(1.1) translateY(-4px);
            }

            &:active {
                transform: scale(1.05) translateY(-2px);
            }
        }
    }
</style>