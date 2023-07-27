'use client';

import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const addTrainerSchema = Yup.object().shape({

  // check if the submitted file is an XML file
  trainer: Yup.mixed()
    .required("Trainer Document Required")
    .test('fileType', 'File must be XML', (value) => {
      if (value) {
        return ['text/xml'].includes(value.type);
      }
      return true;
    }),
});

const AddTrainer = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function addTrainer(formData) {
    setErrorMsg(null)
    setLoading(true)

    const response = await fetch('/api/addtrainer', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml'
      },
      body: formData.trainer
    });

    // if error add error message
    if (!response.ok) {
      setLoading(false)
      setErrorMsg(response.statusText)
    }
    // if successful add success message
    else {
      console.log(response)
      setLoading(false)
      setSuccess(true)
    }
  }

  return (
    <section id="addtrainer">
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
                    <span className="font-semibold text-lg mx-auto">Trainer successfully added!</span>
                  </div>
                </div>
              ) : null}
              {errorMsg ? (
                <div className="alert alert-error mb-5">
                  <span className="font-semibold text-center">An error occured: "{errorMsg}"</span>
                </div>
              ) : null}
              <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                Add Trainer
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Add a new High Street Gym trainer with an XML document
              </p>
              <Formik
                  initialValues={{
                    trainer: ""
                  }}
                  validationSchema={addTrainerSchema}
                  onSubmit={(values)  => {
                    // call submit function and reset form
                    addTrainer(values);
                  }}
                >
                {({ errors, touched, setFieldValue  }) => (
                <Form>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="trainer"
                          className="mb-3 block text-md font-medium text-dark"
                        >
                          Trainer Document
                        </label>
                        <Field
                        className="file-input file-input-bordered file-input-secondary w-full max-w-sm"
                        id="trainer"
                        name="trainer"
                        value={undefined}
                        type="file"
                        onChange={(event)=> {
                          setFieldValue("trainer", event.target.files[0]);
                        }}
                        />
                        {errors.trainer && touched.trainer ? (
                        <div className="text-error">{errors.trainer}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full px-4">
                        {isLoading ? (
                          <span class="loading loading-spinner loading-lg text-primary mx-auto"></span>
                        ) : (
                        <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp" type="submit">
                          Add New Trainer
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

export default AddTrainer;
