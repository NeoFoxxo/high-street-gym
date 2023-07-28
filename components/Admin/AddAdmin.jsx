'use client';

import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const addAdminSchema = Yup.object().shape({

  // check if the submitted file is an XML file
  admin: Yup.mixed()
    .required("Admin Document Required")
    .test('fileType', 'File must be XML', (value) => {
      if (value) {
        return ['text/xml'].includes(value.type);
      }
      return true;
    }),
});

const AddAdmin = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function addAdmin(formData) {
    setErrorMsg(null)
    setLoading(true)

    const response = await fetch('/api/addadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml'
      },
      body: formData.admin
    });

    // if error add error message
    if (!response.ok) {
      setLoading(false)
      setErrorMsg(response.statusText)
    }
    // if successful add success message
    else {
      setLoading(false)
      setSuccess(true)
    }
  }

  return (
    <section id="addadmin">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-50 px-4 text-center">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-base-200 py-11 px-8sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              {isSuccess ? (
                <div className="mb-5 flex flex-col">
                  <div className="alert alert-success mb-5">
                    <span className="font-semibold text-lg mx-auto">Admin user successfully added!</span>
                  </div>
                </div>
              ) : null}
              {errorMsg ? (
                <div className="alert alert-error mb-5">
                  <span className="font-semibold text-center">An error occured: "{errorMsg}"</span>
                </div>
              ) : null}
              <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                Add Admin User
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Add a new High Street Gym administrator with an XML document
              </p>
              <Formik
                  initialValues={{
                    admin: ""
                  }}
                  validationSchema={addAdminSchema}
                  onSubmit={(values)  => {
                    // call submit function
                    addAdmin(values);
                  }}
                >
                {({ errors, touched, setFieldValue  }) => (
                <Form>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="admin"
                          className="mb-3 block text-md font-medium text-dark"
                        >
                          Admin Document
                        </label>
                        <Field
                        className="file-input file-input-bordered file-input-secondary w-full max-w-sm"
                        id="admin"
                        name="admin"
                        value={undefined}
                        type="file"
                        onChange={(event)=> {
                          setFieldValue("admin", event.target.files[0]);
                        }}
                        />
                        {errors.admin && touched.admin ? (
                        <div className="text-error">{errors.admin}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full px-4">
                        {isLoading ? (
                          <span class="loading loading-spinner loading-lg text-primary mx-auto"></span>
                        ) : (
                        <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp" type="submit">
                          Add New Admin
                        </button>
                        )}
                    </div>
                  </div>
                </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAdmin;
