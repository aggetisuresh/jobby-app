import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {
      // mirror the final camelCased shape you'll use in render
      companyLogoUrl: '',
      companyWebsiteUrl: '',
      employmentType: '',
      id: '',
      jobDescription: '',
      skills: [], // safe to map immediately
      lifeAtCompany: {
        // safe to access description/imageUrl
        description: '',
        imageUrl: '',
      },
      location: '',
      packagePerAnnum: '',
      rating: null,
      title: '',
      similarJobs: [], // safe to map immediately
    },
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getItemDetails(id)
  }

  getItemDetails = async id => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedJobsData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }

      const skillsObject = updatedJobsData.jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const {similarJobs} = updatedJobsData

      const similiarJobsList = similarJobs.map(similarJob => ({
        companyLogoUrl: similarJob.company_logo_url,
        employmentType: similarJob.employment_type,
        id: similarJob.id,
        similarJobsDescription: similarJob.job_description,
        location: similarJob.location,
        rating: similarJob.rating,
        title: similarJob.title,
      }))

      const updatedData = {
        companyLogoUrl: updatedJobsData.jobDetails.company_logo_url,
        companyWebsiteUrl: updatedJobsData.jobDetails.company_website_url,
        employmentType: updatedJobsData.jobDetails.employment_type,
        id: updatedJobsData.jobDetails.id,
        jobDescription: updatedJobsData.jobDetails.job_description,
        skills: skillsObject,
        lifeAtCompany: {
          description: updatedJobsData.jobDetails.life_at_company.description,
          imageUrl: updatedJobsData.jobDetails.life_at_company.image_url,
        },
        location: updatedJobsData.jobDetails.location,
        packagePerAnnum: updatedJobsData.jobDetails.package_per_annum,
        rating: updatedJobsData.jobDetails.rating,
        title: updatedJobsData.jobDetails.title,
        similarJobs: similiarJobsList,
      }
      this.setState({jobItemDetails: updatedData})
    }
  }

  render() {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      similarJobs,
    } = jobItemDetails

    return (
      <>
        <Header />
        <div className="job-item-details-container">
          <div className="job-details-card">
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
                <p className="loaction-heading">{location}</p>
                <p className="title-heading">{employmentType}</p>
              </div>
              <p className="package-paragraph">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="link-website-container">
              <h1 className="description-heading">Description</h1>
              <p>
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link-text"
                >
                  Visit
                </a>
              </p>
            </div>
            <p className="job-description">{jobDescription}</p>
            <div className="skills-container">
              <h1 className="skill-sheading">Skills</h1>
              <ul className="skillslist-container">
                {skills.map(eacskillItem => (
                  <li className="skills-list-item" key={eacskillItem.name}>
                    <img
                      src={eacskillItem.imageUrl}
                      className="skill-image"
                      alt={eacskillItem.name}
                    />
                    <p className="skill-name-paragraph">{eacskillItem.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="lifeatcompany-heading">Life at Company</h1>
              <div className="description-container">
                <p className="description-paragraph">
                  {lifeAtCompany.description}
                </p>
                <img
                  src={lifeAtCompany.imageUrl}
                  className="lifeatcompany-image"
                  alt="lifeatcompany-image"
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <div className="similar-jobs-container">
              <div>
                <ul className="similar-jobs-container">
                  {similarJobs.map(eachJobItem => (
                    <SimilarJobs
                      eachJobItem={eachJobItem}
                      key={eachJobItem.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
