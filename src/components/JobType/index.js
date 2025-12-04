import {Link} from 'react-router-dom'

import './index.css'

const JobType = props => {
  const {jobType} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = jobType

  return (
    <li className="list-container">
      <Link to={`/jobs/${id}`} className="link-job-details">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company-logo"
            className="company-logo-image"
          />
          <div>
            <h1 className="employmentType-heading">{title}</h1>
            <p className="rating-paragraph">{rating}</p>
          </div>
        </div>
        <div className="job-details-container">
          <div className="location-container">
            <h1 className="loaction-heading">{location}</h1>
            <h1 className="title-heading">{employmentType}</h1>
          </div>
          <p className="package-paragraph">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobType
