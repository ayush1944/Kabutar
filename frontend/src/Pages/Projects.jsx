import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import axios from '../config/Axios'
import {initializeSocket, sendmsg, receivemsg} from '../config/socket';
import { UserContext } from '../context/user.context';

function Projects() {
    const location = useLocation();

    const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(false)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ selectedUserId, setSelectedUserId ] = useState([])
    const [ project, setProject ] = useState(location.state.project)
    const {user} = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState('');

    const messageBox = React.createRef();
    
    const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }
            console.log(newSelectedUserId);
            return newSelectedUserId;
        });


    }
    function addCollaborators() {

        axios.put("/projects/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            setIsModalOpen(false)

        }).catch(err => {
            console.log(err)
        })

    }
    const removeCollaborators = (userId) => {
        // Filter out the deleted user from the project users list
        const updatedUsers = project.users.filter(user => user._id !== userId);
    
        // Update the state (assuming you have a way to update the project state)
        setProject(prevProject => ({
            ...prevProject,
            users: updatedUsers
        }));
    };

    useEffect(() => {
        axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {

            console.log(res.data.project)

            setProject(res.data.project)
            // setFileTree(res.data.project.fileTree || {})
        }).catch(err => {
            console.log(err)
        });


        axios.get('/users/all').then(res => {
            setUsers(res.data.users)
        }).catch(err => {
            console.log(err)
        })

        initializeSocket(project._id)

        receivemsg('project-msg', (data) => {
            console.log(data)
            appendIncomingMessage(data)
        });

    }, []);
    function sendMessage () {
        sendmsg('project-msg', {
            message: msg,
            sender: user,
        })
        appendOutgoingMessage({
            message: msg,
            sender: user,
        });
        
        setMsg('');
    }
    
    function appendIncomingMessage(messageObject) {
        const messageBox = document.querySelector('.message-box');
        const message = document.createElement('div');
        message.classList.add('message', 'max-w-[30%]', 'break-words', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md');
        message.innerHTML = `
            <small class='text-green-700 opacity-80 text-xs font-semibold'>${messageObject.sender.name}</small>
            <div class='text-sm'>
                <p>${messageObject.message}</p>
            </div>
        `;
        messageBox.appendChild(message);
        scrollToBottom()
    }
    function appendOutgoingMessage(messageObject) {
        const messageBox = document.querySelector('.message-box');
        const message = document.createElement('div');
        message.classList.add('message', 'ml-auto', 
            'max-w-[30%]', 'break-words', 'flex', 'flex-col', 'p-2', 'bg-green-200', 'w-fit', 'rounded-md');
        message.innerHTML = `
            <div class='text-sm whitespace-normal break-words'>
                <p>${messageObject.message}</p>
            </div>
        `;
        messageBox.appendChild(message);
        scrollToBottom()
    }
    function scrollToBottom() {
        messageBox.current.scrollTop = messageBox.current.scrollHeight
    }

return (
        <main className='h-screen w-screen bg-gray-600 bg-opacity-40 flex'>
            <section className='left relative flex flex-col h-screen min-w-96 bg-slate-500'>
            <header className='flex justify-between items-center p-2 px-4 w-full bg-gray-300 absolute z-10 top-0'>
                    <button className='flex gap-2' onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-fill mr-1"></i>
                        <p>Add collaborator</p>
                    </button>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full max-h-full overflow-hidden relative">
                    <div ref={messageBox} className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide">
                        {/* {messages.map((msg, index) => (
                            <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-52'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                                <small className='opacity-65 text-xs'>{msg.sender.email}</small>
                                <div className='text-sm'>
                                    {msg.sender._id === 'ai' ?
                                        WriteAiMessage(msg.message)
                                        : <p>{msg.message}</p>}
                                </div>
                            </div>
                        ))} */}
                    </div>
                    <div className="inputField w-full flex absolute bottom-0">
                        <input
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
                            className='p-2 px-4 border-none outline-none flex-grow' type="text" placeholder='Enter message' />
                        <button onClick={sendMessage}
                            className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill"></i></button>
                    </div>

                    <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-400 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0 z-20`}>
                        <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>
                            <h1
                                className='font-semibold text-lg'
                            >Collaborators</h1>
                            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                                <i className="ri-close-fill text-2xl hover:bg-red-500 hover:rounded-md hover:text-white  "></i>
                            </button>
                        </header>
                        <div className="users flex flex-col gap-2 h-max overflow-auto p-2">
                            {project.users && project.users.map(user => (
                                <div key={user._id} className='user p-2 bg-slate-100 flex gap-2 items-center rounded'>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-semibold text-lg'>{user.name || "No Name"}</h1>
                                        <p className='font-thin text-sm opacity-75'> {user.email}</p>
                                    </div>
                                    <div className='flex gap-2 ml-auto'>
                                        <button onClick={() => removeCollaborators(user._id)}   className='p-2 text-slate-700 hover:bg-red-300 rounded-md'><i className="ri-delete-bin-2-fill"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill text-2xl hover:bg-red-500 hover:rounded-md hover:text-white  "></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user.id} className={`user cursor-pointer hover:bg-slate-400 hover:rounded ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-400 rounded' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-semibold text-lg'>{user.name || "No Name"}</h1>
                                        <p className='font-thin text-sm opacity-75'> {user.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Projects