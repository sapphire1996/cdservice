import React from 'react';
import {Link} from 'react-router-dom';

const AppGuidline =()=>{
    return(
        <div className="container card-panel">
            <h1 className="detail text-center">Tips to make better use of this app</h1>
            <p>There are 4 core functions you can perform with the application, but before any thing,
            subscribe to receive notification from your profile, as this will enable you to receive latest information
            from NYSC and your fellow corp members</p>
            <p>Also make sure you add this app to your home screen to ensure a better communication</p>
            <p>Ok, If you've done that, Now Let's get Started!</p>
            <ol>
                <li>
                    <p>The primary function of this app is to <Link to="/registration">register</Link>  to be assigned a CDS group</p>
                    <p>When you register, you may have to wait for some time to be assigned a CDS group. Just Check Back</p>
                </li>
                <li>
                    <p>Another function you can carry out on this platform is <Link to="/post">upload</Link> your personal CDS projects</p>
                    <p>Note that this is for completed project only. You can post as many projust as you completed</p>
                </li>
                <li>
                    <p>This platform also provide an avenue for you to place adverts. This can be done from your profile page</p>
                    <p>Advert may range from that of your business, selling off your items before passing out, seeking for roommate or even placing advert on behalf of non-corp members. If you are smart with this, it can generate you passive income.</p>
                    <p>When you have paid for and submited an advert for review, Kindly notify the admin through the messaging tool on your profile.</p>
                    <p><span className="pink-text">Note:</span> endeavour to complete the steps here with good internet connetion, to avoid issues with paid and un-submited advert, as the admin will only approve advert seen. <span className="pink-text">ON NO ACCOUNT WILL THERE BE ANY REFUND OF MONEY!</span></p>
                    <p>Admin can disapprove your advert depending on the content is being perceived. One advantage here is that your ad will be renotified to users upon disapproval</p>
                    <p><span className="pink-text">It is also important to note:</span> that your subscrition to notification will play a vital role here. You will not receive notification about your ads if you did not subcsribe</p>
                </li>
                <li>
                    <p>The last function allow you interact with the NYSC admin</p>
                    <p>Note that this is only for guinue complaints and not for chit-chat. Avoid being queried</p>
                    <p>Other way you can interact here is by liking other people's projects</p>
                </li>
            </ol>
            <p>A guildline for carrying out personal CDS Project has been written for your benefit, make use of it.</p>
            <hr/>
            <div className="right">
            <h5>Signed: Pelumi Adebayo</h5>
            <small className="copyright">Developer</small>
            </div>
        </div>
    )}
export default AppGuidline;