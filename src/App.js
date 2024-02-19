//import MultiSelect from "./lib/index";
import './App.css';
import Editor from './Editor.js';
import InfoTable from './InfoTable.js';

import React, {useState} from "react";
import Select from 'react-select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App()  {
    const [companies, setCompanies] = 
    useState([
        {label: 'Microsoft',  id:1, category: 'Technology Cooperation'}, 
        {label: 'Samsung',    id:2, category: 'Electronics'}, 
        {label: 'Airbnb',     id:3, category: 'Online marketplace'}, 
        {label: 'Tesla',      id:4, category: 'Automotive'}, 
        {label: 'Netflix',    id:5, category: 'Online streaming'}
        ]);
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleSave = (newValue) => {
        setCompanies((prevCompanies) => {
        return prevCompanies.map((company) =>
            company.id === newValue.id ? newValue : company
        );
    });
    setSelectedOption(newValue);
        console.log('Changed ' + newValue.label + '`s category to: ' + newValue.category);
    };
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption)
        console.log('Selected ' + selectedOption.label + ' category to: ' + selectedOption.category);
    }

    return (
        <div className="content">
            <h2>Editor</h2>
            <p>Select a value below to edit</p>
            <Select 
                options= {companies}
                onChange={handleChange}
            />
            <br></br>
            <Editor onSubmit={handleSave} selectedOption={selectedOption}/>
            <br></br>
            <h2>Information</h2>
            <InfoTable companies={companies} />

        </div>
    );    
}

export default App;
