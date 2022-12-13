<script>
    import {baseUrl, user} from "../stores.js";
    import { toast } from '@zerodevx/svelte-toast'

    export let bindGroup = [];
    export let value = "";

    const onChange = ({target}) => {
        const {value, checked} = target;
        if (checked) {
            bindGroup = [...bindGroup, value]
        } else {
            bindGroup = bindGroup.filter((item) => item !== value);
        }

        // save to database
        (() => {
            fetch(`${$baseUrl}/api/profile/glasses`, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json",
                    "auth-token": $user.token
                },
                "body": JSON.stringify({
                    "email": $user.email,
                    "myCollection": bindGroup
                })
            }).then(response => response.json());
        })()

        // store it locally..
        $user.myCollection = bindGroup
        localStorage.setItem('user', JSON.stringify($user))


        // toast TODO why not working?
        toast.push('Success!', {
            theme: {
                '--toastColor': 'mintcream',
                '--toastBackground': 'rgba(72,187,120,0.9)',
                '--toastBarBackground': '#2F855A'
            }
        })
    };
</script>

<input checked={bindGroup.includes(value)}
       class="form-check-input custom-switch"
       on:change={onChange}
       role="switch"
       type="checkbox"
       {value}>

<style>
    .custom-switch {
        font-size: 150%;
    }
</style>
