import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import './index.css'

import Header from '../Header'
import EmploymentDetails from '../EmploymentDetails'
import SalaryRangeDetails from '../SalaryRangeDetails'
import ProfileDetails from '../ProfileDetails'
import JobsList from '../JobsList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileDetails: updatedData})
    }
  }

  render() {
    const {profileDetails} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-details-container">
            <ProfileDetails profileDetails={profileDetails} />
            <hr />
            <div className="list-container-card">
              <h1 className="list-heading">Type of Employment</h1>
              <ul className="list-container">
                {employmentTypesList.map(eachItem => (
                  <EmploymentDetails
                    key={eachItem.employmentTypeId}
                    employmentType={eachItem}
                  />
                ))}
              </ul>
            </div>
            <hr />
            <div className="list-container-card">
              <h1 className="list-heading">Salary Range</h1>
              <ul className="list-container">
                {salaryRangesList.map(eachItem => (
                  <SalaryRangeDetails
                    key={eachItem.salaryRangeId}
                    salaryRange={eachItem}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-list-container">
            <div className="input-search-container">
              <input
                type="search"
                className="search-jobs"
                placeholder="Search"
              />
              <button
                type="button"
                className="search-icon-button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <JobsList />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
