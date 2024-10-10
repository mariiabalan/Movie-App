import { Formik, Form, Field } from "formik";

import s from "./SearchMovies.module.css";

const SearchMovies = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    handleChangeQuery(values.query);
    resetForm();
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Search Movies</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field
            name="query"
            className={s.input}
            placeholder="Enter movie title"
          />
          <button className={s.btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchMovies;
