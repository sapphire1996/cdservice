import React from 'react';
import moment from 'moment'
import PreviewPicture from './PreviewPicture'

const ProjectSummary =({project})=>{
    return(
        <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
        <div className="border">
        {project.picture?<PreviewPicture pictureUrl={project.picture} height="200px"/>:null}
        </div>
            <span className="card-title">{project.title}</span>
            <p>Posted by {project.authorFullName} {project.stateCode}</p>
            <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
            <h4 className="formSuccess"><strong>{project.likeCount>1?project.likeCount + " likes":project.likeCount + " like"}</strong></h4>
        </div>
    </div>
    );
}
export default ProjectSummary;