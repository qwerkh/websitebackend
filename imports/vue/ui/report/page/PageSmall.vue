<template>
    <div class="page-small">
        <div class="smallForm" align="center !important"
             style="font-size: 10px !important;width: 260px !important;margin: 0 auto;">
            <div class="center">
                <slot name="header"></slot>
            </div>
            <div class="">
                <slot name="content"></slot>
            </div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scope>

    @page {
        size: A4;
        margin: 0;
    }

    @media print {
        html, body {
            width: 70mm !important;
            height: auto;
        }

        table {
            background: #000;
            height: auto;
        }
    }
</style>