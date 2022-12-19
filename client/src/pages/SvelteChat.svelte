<script>
    import io from "socket.io-client";
    import {displaySuccess} from "../js/toast.js";

    const socket = io.connect("http://127.0.0.1:3000");

    socket.on("update the color", (data) => {
        displaySuccess(data.data)
    });

    const sendMessage = () => {
        socket.emit("client choose a new color", {data: "Hello"});
    };
</script>

<button on:click={sendMessage}>Send message</button>