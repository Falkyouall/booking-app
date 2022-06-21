import { Formik } from "formik";
import "./styles.css";

const INITIAL_FORM_VALUES = {
  startDate: "2020-09-12",
  endDate: "2020-09-13",
  minimalRating: 0,
};

const SearchFormSelectInput = ({ label, name, options, handleChange, value }) => {
  return (
    <div className="SearchFormInput">
      <label className="SearchFormInput-label" htmlFor={name}>
        {label}
      </label>
      <select className="SearchFormInput-input" id={name} name={name} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const SearchFormDateInput = ({ label, name, value, handleChange }) => {
  return (
    <div className="SearchFormInput">
      <label className="SearchFormInput-label" htmlFor={name}>
        {label}
      </label>
      <input className="SearchFormInput-input" type="date" id={name} value={value} onChange={handleChange} />
    </div>
  );
};

const SearchForm = ({ onSubmit, locations }) => {
  const initialValues = {
    ...INITIAL_FORM_VALUES,
    locationId: locations[0].id,
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="SearchForm">
            <div className="SearchForm-inputs">
              <SearchFormSelectInput
                label="Location"
                name="locationId"
                value={values.locationId}
                handleChange={handleChange}
                options={locations.map(({ id, name }) => ({ label: name, value: id }))}
              />
              <SearchFormDateInput
                name="startDate"
                label="Start date"
                value={values.startDate}
                handleChange={handleChange}
              />
              <SearchFormDateInput name="endDate" label="End date" value={values.endDate} handleChange={handleChange} />
              <SearchFormSelectInput
                label="Minimal rating"
                name="minimalRating"
                value={values.minimalRating}
                handleChange={handleChange}
                options={[...new Array(6)].map((_, index) => ({
                  label: index.toString(),
                  value: index,
                }))}
              />
            </div>
            <div className="SearchForm-button-background"></div>
            <button type="submit" className="SearchForm-button">
              Search
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SearchForm;
