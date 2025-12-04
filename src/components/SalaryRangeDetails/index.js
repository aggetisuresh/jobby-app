const SalaryRangeDetails = props => {
  const {salaryRange} = props
  const {label, salaryRangeId} = salaryRange
  return (
    <div className="list-details">
      <input id={salaryRangeId} type="checkbox" className="checkbox" />
      <label htmlFor={salaryRangeId} className="label">
        {label}
      </label>
    </div>
  )
}

export default SalaryRangeDetails
