import React, { FormEvent } from 'react';

import './Settings.scss';

const Settings = () => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    };

    return (
        <div className='settings'>
            <form onSubmit={handleSubmit}>
                <label>
                    Имя:
                    <input type='text' name='username' />
                </label>
                <button>Сохранить</button>
            </form>
        </div>
    );
}

export default Settings;