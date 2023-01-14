<div class="mx-auto fixed-top top-background"></div>

<style>
    .top-background {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 300px;
        z-index: -1;
        background: linear-gradient(242deg, #457373, #9B8148);
        background-size: 400% 400%;
        -webkit-animation: background 29s ease infinite;
        -moz-animation: background 29s ease infinite;
        animation: background 29s ease infinite;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    }

    @-webkit-keyframes background {
        0% {
            background-position: 0 59%
        }
        50% {
            background-position: 100% 42%
        }
        100% {
            background-position: 0 59%
        }
    }

    @-moz-keyframes background {
        0% {
            background-position: 0 59%
        }
        50% {
            background-position: 100% 42%
        }
        100% {
            background-position: 0 59%
        }
    }

    @keyframes background {
        0% {
            background-position: 0 59%
        }
        50% {
            background-position: 100% 42%
        }
        100% {
            background-position: 0 59%
        }
    }
</style>
