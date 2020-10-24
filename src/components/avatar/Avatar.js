import React, {useEffect} from 'react';
import './Avatar.css';

const Avatar = ({user: user}) => {

    useEffect(() => {
        console.log(user.name);
    })
    return (
        <>
            <div className="avatar">
                <img
                    src={user.image}
                    id="avatarimage"
                    class="img-thumbnail"
                />
                <div id="userinfo">
                    <h4>{user.name}</h4>
                    <p>{user.job}</p>
                    <p>Joined on {user.join}</p>
                    <h5>{user.salary}/month</h5>
                    <div className="employment">
                        <h4 id="employmentstatus">{user.employment}</h4>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default Avatar;