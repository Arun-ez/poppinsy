import "./VideoStreamer.css";
import React, { useContext } from 'react'
import { SocketContext } from "../../contexts/SocketContext";

const VideoStreamer = () => {

    const { name, user1, user2, stream } = useContext(SocketContext);


    return (
        <div className='streamer'>
            <div>
                <h5> {name || 'Name'} </h5>
                <video className="video_frame" playsInline muted autoPlay ref={user1} />
            </div>

            <div>
                <h5> Name </h5>
                <video className="video_frame" playsInline muted autoPlay ref={user2} />
            </div>
        </div>
    )
}

export { VideoStreamer }
