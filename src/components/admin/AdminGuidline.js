import React from 'react';
import {Link} from 'react-router-dom';

const AdminGuidline =()=>{
    return(
        <div className="container card-panel">
            <h1 className="text-center">Guides To Application Usage</h1>
            <p>The primary aim of this app is to assign CDS group to corp member. Data collated from this registration can then be downloaded for documentation</p>
           <br/>
            <h2>Step by Step Guides</h2>
            <ol>
                <li>
                    <p>List of  corp members who has sign up and registered to be assign a CDS group on this platform will show
                        up in the <Link to="/reg">assigning page</Link> where ADMIN can then assign approprite CDS. 
                    </p>
                    <p>Note that corp members whose course of study has a predefined CDS group will not show up here, as the system would have automatically assigned them a CDS group</p>
                </li>
                <li>
                    <p>List of all corp member who has been assigned a CDS group will show up in a <Link to="/register">register.</Link> Where they can then be downloaded to spreed sheet.</p>
                    <p>Admin Should Kindly download and delete content of this Register as soon as all registration is done. This will make it available for next fresh data</p>
                </li>
                <li>
                    <p>Notification call be sent to all corp member using this platform by clicking on Send Notification in the <Link to="/admin">admin panel.</Link></p>
                    <p>One way to know if notification has been send and received is by checking the Notification dropdown to see if the message appears there </p>
                    <p>Admin Should kindly refer to the specific people the message is targeted to. Eg, Local govt.</p>
                </li>
                <li>
                    <p>Admin can can register another Admin to ease the work load of assigning CDS group to corp member and other seting up duties</p>
                    <p>For Example: Admin can assign admin role to each local government officials, so they can assign CDS to registeredS corp member in their respective local Government</p>
                    <p>This can be done in the last tab in <Link to="/admin">admin panel.</Link> Email and password used in registering should be given to them. This will enable them to login to access Admin Panel</p>
                </li>
                <li>
                    <p>Admin also approve adverts that has been placed, or Delete it.</p>
                    <p>Adverts which has been paid for will be listed in the admin pannel for the admin to approve</p>
                    <p>To validate if an advertizer really paid for an advert, admin can check the days to day payment in advert income</p>
                    <p>To delete/disapprove an advert, you have to appoved it first. Unapproved/deleted advert will not be displayed to corp members</p>
                </li>
                <li>
                    <p>Admin can aslo <Link to="/guildline">update guildline</Link> for carrying out personal CDS projects</p>
                    <p>Just copy existing content to the text area, make neccesfy changes, and submit by clicking 'Update'</p>
                    <p>OR, a fresh content can be writen afresh, and submitted</p>
                </li>
            </ol>
            <hr/>
            <br/>

            <h2>Setting Up</h2>
            <p>This Application require a little bit of set-ups. This set up enables this application to function the way we want.</p>
            <p><span className="pink-text">For Example: </span>Setting up List of CDS group available in a Local government area OR Setting up Course of study that has predefined CDS group</p>
            <p><span className="pink-text">Note that: </span>Most of this set-up is a once in a life time set-up, except if there migth be a change in the future. </p>
            <br/>

            <h3>There are Just Three Set-up to do, which are:</h3>
            <ol>
                <li>
                    <h4>Editing Registration form</h4>
                    <p>It is Important that the admin Update the registration form to current batch who are to use the form </p>
                    <p>This can be done in the second black tab in <Link to="/admin">admin panel.</Link></p>
                    <p>Click publish once you are done setting up.</p>
                </li>
                <li>
                    <h4>Setting Up CDS Group List</h4>
                    <p>This is where the list of all CDS group will be set up, including the course of study in the CDS</p>
                    <p>This will enable auto-assigning of CDS group to registered corp member who studied this course</p>
                    <p>A way to do this is to add all CDS group names, one after the other in the third black tab in <Link to="/admin">admin panel.</Link> </p>
                    <p>Afterwards, any CDS that required a specific course can be clicked on, to add those courses</p>
                </li>
                <li>
                    <h4>Local government List Set-up</h4>
                    <p>Here, We will set-up all local government, including the list CDS groups available in each local government </p>
                    <p>The importance of this is that, it makes it easier to assign CDS group to corp member according to Local Government</p>
                    <p>To do this, add all Local government names, one after the other in the third black tab in <Link to="/admin">admin panel.</Link> </p>
                    <p>Afterwards, click on each local government to add the CDS groups available in that local government</p>

                </li>
            </ol>
            <hr/>
            <div className="right">
            <h5>Signed: Pelumi Adebayo</h5>
            <small className="copyright">Developer</small>
            </div>
        </div>
    )}
export default AdminGuidline;