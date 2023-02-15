import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKey from '@mui/icons-material/VpnKey';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';



export default function Password() {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };



    return(
        <div className="flex items-center flex-col sm:flex-row gap-2" style={{width: "100%"}}>
          <div>
            <VpnKey sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          </div>
          <div style={{width: "100%"}}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-password-input"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                      <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    required
                  />
                </FormControl>
          </div>        
        </div>
    )
}