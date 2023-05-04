import { createContext, useState, useEffect, useRef } from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:8080');

const SocketContextProvider = ({ children }) => {

    const user1 = useRef();
    const user2 = useRef();
    const connectionRef = useRef();

    const [stream, set_stream] = useState(null);

    const [name, set_name] = useState('');
    const [user, set_user] = useState(null);
    const [call, setCall] = useState(null);
    const [callReceiveStatus, set_callReceiveStatus] = useState(false);
    const [callEnded, set_callEnded] = useState(false);


    const answerCall = () => {
        set_callReceiveStatus(true);

        const peer = new Peer({ initiator: false, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from })
        })

        peer.on('stream', (currentStream) => {
            user2.current.src = currentStream;
        })

        peer.signal(call.signal)
        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', { userTocall: id, signalData: data, from: user, name })
        })

        peer.on('stream', (currentStream) => {
            user2.current.Object = currentStream;
        })

        socket.on('callaccepted', (signal) => {
            callReceiveStatus(true);
            peer.signal(signal);
        })

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        set_callEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((currentStream) => {
            set_stream(currentStream);
            user1.current.srcObject = currentStream;
        })

        socket.on('user', (id) => {
            set_user(id)
        })

        socket.on('calluser', ({ signal, from, name: callerName }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal })
        })

    }, [])

    return (
        <SocketContext.Provider
            value={
                {
                    call,
                    callReceiveStatus,
                    user1, user2,
                    name, set_name,
                    callEnded,
                    user,
                    callUser,
                    leaveCall,
                    answerCall
                }
            }

        >
            {children}

        </SocketContext.Provider>
    )
}

export { SocketContextProvider, SocketContext }
