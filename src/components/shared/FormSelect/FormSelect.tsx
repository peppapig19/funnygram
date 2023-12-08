import React, {
    ChangeEvent
} from 'react';

import FormSelectOptionType from './FormSelectOptionType';

import './FormSelect.scss';

interface FormSelectProps {
    options: FormSelectOptionType[];
    selectedValue: string;
    defaultOptionText: string;
    keygen: string;
    onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect = (props: FormSelectProps) => {
    const { options, selectedValue, defaultOptionText, keygen, onSelect } = props;

    return (
        <select className='form-select' value={selectedValue} onChange={onSelect}>
            <option key={keygen + '_default'} value=''>{defaultOptionText}</option>
            {options.map(option =>
                <option key={keygen + option.value} value={option.value}>
                    {option.text.toLowerCase()}
                </option>
            )}
        </select>
    );
}

export default FormSelect;