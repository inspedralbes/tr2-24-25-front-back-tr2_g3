import { useAppStore } from "@/stores/app";


const urlBase = 'http://catch-the-math.dam.inspedralbes.cat:29876'

async function login(email, password) {
    const response = await fetch(`${urlBase}/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    return response;
}

async function register(username, email, password) {
    const response = await fetch(`${urlBase}/auth/register`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    return response;
}

async function getUser () {
    const pinia = useAppStore();
    const response = await fetch(`${urlBase}/user`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Authorization': `Bearer ${pinia.token}`,
            
        },
    });
    return response;
}

async function getCode () {
    const pinia = useAppStore();
    const response = await fetch(`${urlBase}/create-code`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Authorization': `Bearer ${pinia.token}`,
            
        },
    });
    return response;
}



const communicationManager = {
 login,
 register,
 getUser,
}

export default communicationManager;