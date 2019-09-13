import React from 'react';
import moment from 'moment'
import PreviewPicture from './PreviewPicture'

const ProjectSummary =({project})=>{
    return(
        <div className="card z-depth-0 project-summary projectSection">
        <div className=" grey-text text-darken-3">
        <div className="border">
        {project.picture?<PreviewPicture pictureUrl={project.picture} height="200px"/>:null}
        </div>
            <span className="card-title advertizer">{project.title}</span>
            <p ><strong>Posted by {project.authorFullName} {project.stateCode}</strong></p>
            <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
            <h4 className="formSuccess"><strong>{project.likeCount>1?project.likeCount + " likes":project.likeCount + " like"}</strong></h4>
        </div>
    </div>
    );
}
export default ProjectSummary;