<template>
    <div id="base-home">
        <!--<div class="row text-center align-center justify-center" style="padding: 15% !important">
            <div class="mb-10 col col-12"><h2 class="display-3 font-weight-light grey&#45;&#45;text text&#45;&#45;lighten-2 mb-12">
                CodeRed Technology </h2>
                <div class="display-1 font-weight-light grey&#45;&#45;text text&#45;&#45;lighten-2"> {{$t("introCompany")}}
                </div>
            </div>
            <div class="d-flex col-sm-6 col-md-3 col-12">
                <div class="v-card&#45;&#45;plan mx-auto pt-3 pb-4 px-2 text-center v-card v-sheet theme&#45;&#45;dark transparent elevation-0"
                     style="max-width: 100%;">
                    <div class="body-2 text-uppercase grey&#45;&#45;text">Freelancer</div>
                    <div class="v-avatar" style="height: 130px; min-width: 130px; width: 130px;"><i aria-hidden="true"
                                                                                                    class="v-icon notranslate mdi mdi-sofa theme&#45;&#45;dark"
                                                                                                    style="font-size: 64px;"></i>
                    </div>
                    <h2 class="display-2 font-weight-light">Free</h2>
                    <div class="v-card__text body-1 font-weight-light pa-1">This is good if your company size is between
                        2 and 10 Persons.
                    </div>
                    <button type="button"
                            class="v-btn v-btn&#45;&#45;contained v-btn&#45;&#45;rounded theme&#45;&#45;dark v-size&#45;&#45;default white"><span
                            class="v-btn__content"> Choose Plan </span></button>
                </div>
            </div>&lt;!&ndash;&ndash;&gt;
            <div class="d-flex col-sm-6 col-md-3 col-12">
                <div class="v-card&#45;&#45;plan mx-auto pt-3 pb-4 px-2 text-center v-card v-sheet theme&#45;&#45;light"
                     style="max-width: 100%;">
                    <div class="body-2 text-uppercase grey&#45;&#45;text">Small Company</div>
                    <div class="v-avatar" style="height: 130px; min-width: 130px; width: 130px;"><i aria-hidden="true"
                                                                                                    class="v-icon notranslate mdi mdi-home theme&#45;&#45;light success&#45;&#45;text"
                                                                                                    style="font-size: 64px;"></i>
                    </div>
                    <h2 class="display-2 font-weight-light">29$</h2>
                    <div class="v-card__text body-1 font-weight-light pa-1">This is good if your company size is between
                        2 and 10 Persons.
                    </div>
                    <button type="button"
                            class="v-btn v-btn&#45;&#45;contained v-btn&#45;&#45;rounded theme&#45;&#45;light v-size&#45;&#45;default success"><span
                            class="v-btn__content"> Choose Plan </span></button>
                </div>
            </div>&lt;!&ndash;&ndash;&gt;
            <div class="d-flex col-sm-6 col-md-3 col-12">
                <div class="v-card&#45;&#45;plan mx-auto pt-3 pb-4 px-2 text-center v-card v-sheet theme&#45;&#45;dark transparent elevation-0"
                     style="max-width: 100%;">
                    <div class="body-2 text-uppercase grey&#45;&#45;text">Medium Company</div>
                    <div class="v-avatar" style="height: 130px; min-width: 130px; width: 130px;"><i aria-hidden="true"
                                                                                                    class="v-icon notranslate mdi mdi-domain theme&#45;&#45;dark"
                                                                                                    style="font-size: 64px;"></i>
                    </div>
                    <h2 class="display-2 font-weight-light">69$</h2>
                    <div class="v-card__text body-1 font-weight-light pa-1">This is good if your company size is between
                        11 and 99 Persons.
                    </div>
                    <button type="button"
                            class="v-btn v-btn&#45;&#45;contained v-btn&#45;&#45;rounded theme&#45;&#45;dark v-size&#45;&#45;default white"><span
                            class="v-btn__content"> Choose Plan </span></button>
                </div>
            </div>&lt;!&ndash;&ndash;&gt;
            <div class="d-flex col-sm-6 col-md-3 col-12">
                <div class="v-card&#45;&#45;plan mx-auto pt-3 pb-4 px-2 text-center v-card v-sheet theme&#45;&#45;dark transparent elevation-0"
                     style="max-width: 100%;">
                    <div class="body-2 text-uppercase grey&#45;&#45;text">Extra Pack</div>
                    <div class="v-avatar" style="height: 130px; min-width: 130px; width: 130px;"><i aria-hidden="true"
                                                                                                    class="v-icon notranslate mdi mdi-bank theme&#45;&#45;dark"
                                                                                                    style="font-size: 64px;"></i>
                    </div>
                    <h2 class="display-2 font-weight-light">159$</h2>
                    <div class="v-card__text body-1 font-weight-light pa-1">This is good if your company size is 99+ or
                        greater Persons.
                    </div>
                    <button type="button"
                            class="v-btn v-btn&#45;&#45;contained v-btn&#45;&#45;rounded theme&#45;&#45;dark v-size&#45;&#45;default white"><span
                            class="v-btn__content"> Choose Plan </span></button>
                </div>
            </div>&lt;!&ndash;&ndash;&gt;</div>-->
    </div>
</template>

<script>
    export default {
        name: "Home",
        mounted() {
            this.$jQuery('body').off();
        },
        data() {
            return {
                dense: this.$store.state.isDense,
                test: "Hi",
            }
        },
        methods: {}
    }
</script>


<style scoped>
    /*#base-home {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/login1.jpg');
        !*background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/login.jpg');*!
        background-position: center center;
        background-size: cover;

        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: inherit;
        !*z-index: 1;*!
        !*width: 0;*!
        !*height: 0;*!
        background-size: cover;
    }*/
</style>