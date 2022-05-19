import React from 'react';

import { BsEye } from 'react-icons/bs';

import './form.scss';

// /. imports

const Form: React.FC = () => {
    return (
        <form className="form">
            <div className="form__wrapper">

                <label className="form__label" htmlFor="email">
                    Email Addres
                    <input className="form__input form__input--email" type="text" id="email" placeholder="johndoe@gmail.com" required />
                </label>

                <label className="form__label" htmlFor="password">
                    Password
                    <input className="form__input form__input--password" type="password" id="password" required />
                    <BsEye className="form__icon-password" size={20} />
                </label>

                <div className="form__agreement">
                    <label className="form__label form__label--agreement" htmlFor="agreement">
                        Remember me
                        <input className="form__input form__input--checkbox" type="checkbox" id="agreement" />
                    </label>
                    <span className="form__restore">Forgot Password?</span>
                </div>


                <button className="form__button">Log in</button>

            </div>
        </form>
    );
};

export default Form;