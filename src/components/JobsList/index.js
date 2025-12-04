import {Component} from 'react'

import Cookies from 'js-cookie'

import JobType from '../JobType'

import './index.css'

class JobsList extends Component {
  state = {jobsList: []}

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      const jobsListItems = data.jobs
      const updatedJobsList = jobsListItems.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updatedJobsList)
      this.setState({jobsList: updatedJobsList})
    }
  }

  render() {
    const {jobsList} = this.state

    return (
      <>
        <ul className="jobs-list-container">
          {jobsList.map(eachItem => (
            <JobType key={eachItem.id} jobType={eachItem} />
          ))}
        </ul>
      </>
    )
  }
}

export default JobsList
