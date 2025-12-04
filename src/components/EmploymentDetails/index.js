import './index.css'

const EmploymentDetails = props => {
  const {employmentType} = props
  const {label, employmentTypeId} = employmentType
  return (
    <div className="list-details">
      <input id={employmentTypeId} type="checkbox" className="checkbox" />
      <label htmlFor={employmentType} className="label">
        {label}
      </label>
    </div>
  )
}

export default EmploymentDetails
