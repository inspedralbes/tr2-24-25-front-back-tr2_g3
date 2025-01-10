import { useAppStore } from "@/stores/app";
import { emitRoleChange } from '@/services/socketManager';

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

async function modifyPermission(userId, permissionTypeId) {
    const pinia = useAppStore();
    const response = await fetch(`${urlBase}/modify-permission`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Authorization': `Bearer ${pinia.token}`,
        },
        body: JSON.stringify({
            user_id: userId,
            permission_type_id: permissionTypeId
        }),
    });
    
    if (response.ok) {
        // Emitir el cambio de rol a través del socket
        emitRoleChange(userId, permissionTypeId);
    }
    
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
 getCode,
 modifyPermission
}

export default communicationManager;
