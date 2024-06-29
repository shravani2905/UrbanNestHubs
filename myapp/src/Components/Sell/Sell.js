import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import FileBase64 from 'react-file-base64';
import './Sell.css';
import { UserContext } from '../../Contexts/UserContext'; // Adjust the import path as per your file structure

const SellForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [image, setImage] = useState('');
  const [user] = useContext(UserContext); // Assuming UserContext provides user.username
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = (newData) => {
    const completeData = {
      ...newData,
      image: image,
      id: Date.now(),
      type: 'Buy',
      status: 'available',
      seller: user.username, // Add seller's name here
    };

    fetch('http://localhost:4000/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(completeData),
    })
      .then((res) => {
        if (res.status === 201) {
          setSubmitSuccess(true);
          reset(); // Reset form fields on successful submission
        }
      })
      .catch((err) => console.log('Error adding data:', err));
  };

  return (
    <div>
      <form className="sell-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="sell-form__group">
          <label className="sell-form__label" htmlFor="title">
            Title
          </label>
          <input className="sell-form__input" id="title" {...register('title', { required: true })} />
          {errors.title && <span className="sell-form__error">This field is required</span>}
        </div>

        <div className="sell-form__group">
          <label className="sell-form__label" htmlFor="location">
            Location
          </label>
          <input className="sell-form__input" id="location" {...register('location', { required: true })} />
          {errors.location && <span className="sell-form__error">This field is required</span>}
        </div>

        <div className="sell-form__group">
          <label className="sell-form__label" htmlFor="cost">
            Cost
          </label>
          <input className="sell-form__input" id="cost" {...register('cost', { required: true })} />
          {errors.cost && <span className="sell-form__error">This field is required</span>}
        </div>

        <div className="sell-form__group">
          <label className="sell-form__label" htmlFor="squareFeet">
            Square Feet
          </label>
          <input className="sell-form__input" id="squareFeet" {...register('squareFeet', { required: true })} />
          {errors.squareFeet && <span className="sell-form__error">This field is required</span>}
        </div>

        <div className="sell-form__group">
          <label className="sell-form__label" htmlFor="image">
            Image Upload
          </label>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setImage(base64)}
            className="sell-form__file-input"
          />
          {errors.image && <span className="sell-form__error">This field is required</span>}
        </div>

        <button className="sell-form__button" type="submit">
          Submit
        </button>
      </form>

      {submitSuccess && (
        <p className="sell-form__success-message">Submitted successfully!</p>
      )}
    </div>
  );
};

export default SellForm;
