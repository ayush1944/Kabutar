import socket from "socket.io-client"

let socketInstance = null

export const initializeSocket = (projectId)=>{
	socketInstance = socket(import.meta.env.VITE_API_URL || "http://localhost:3000", {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId : projectId
        }
    });
    return socketInstance
}
export const sendmsg = (eventName, cb) => {
    socketInstance.emit(eventName, cb);
}
export const receivemsg = (eventName, cb) => {
    socketInstance.on(eventName, cb);
}