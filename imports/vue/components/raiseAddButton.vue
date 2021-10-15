<template>
    <v-fab-transition>
        <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
        >
            <v-btn @click="$emit('add')"
                   absolute
                   dark
                   fab
                   bottom
                   right
                   color="pink"
                   fixed
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-hover>
    </v-fab-transition>
</template>

<script>
    export default {
        name: "RaiseButton"
    }
</script>
