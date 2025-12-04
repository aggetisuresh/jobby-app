import './index.css'

const SimilarJobs = props => {
  const {eachJobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    similarJobsDescription,
    location,
    rating,
    title,
  } = eachJobItem

  return (
    <li className="similar-jobs-list-item">
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
      <h1 className="description-heading">Description</h1>
      <p className="description-content">{similarJobsDescription}</p>
      <div className="location-similar-jobs-container">
        <p className="location-similar-jobs">{location}</p>
        <p className="employmentType-similar-jobs">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
