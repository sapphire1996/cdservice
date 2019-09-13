import React from 'react';

const ProjectGuidline =(props)=>{
    const {cdsProjectGuide} = props;
return(
<div className="section">
    <div className="card z-depth-0">
    <div className="card-content">
    <span className="card-title">Personal CDS Project Guidline</span>
       {cdsProjectGuide && cdsProjectGuide.map(guide =>{
           return(
                <div className="grey-text note-date" key={guide.id}>
                <h4>{guide.content}</h4>
                </div>
           )}
       )}
    </div>
    </div>
</div>
)
}

export default ProjectGuidline