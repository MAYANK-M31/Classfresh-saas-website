import React, { useEffect, useState } from 'react';
import "../../../css/Connect/Chat/ChatBar.css"

const ChatBar = (props) => {


    return (


        <div className="Bar" >
            <div className="Bar-Inside" >
                <div className="Profile-View" >
                    <div className="Profile" >

                    </div>
                </div>

                <div className="InfoView" >
                    <div className="ChatNameView" >
                        <div className="ChatNameViewInside">
                            <p >{props.ChatName}</p>
                        </div>
                        <div className="ChatNameDate">
                            <p style={{margin:0}}>{props.TimeStamp}</p>
                        </div>
                    </div>

                    <div className="ChatMessageView" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="MessagePreview">
                            <p numberOfLines={1} >{props.LatestMessage}</p>
                        </div>
                        <div className="MessageCount" >
                        <div className="MessageBadge" >
                            <p>{props.NumberMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

};



export default ChatBar;


