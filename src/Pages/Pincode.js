import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Link } from '@material-ui/core';
import axios from 'axios';
import Home from './Home';
import ShowList from './ShowList';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const Pincode = () => {
    let myref = React.createRef()
    let [pincode, setPin] = useState("")
    let [data,setData] = useState([])
    let [ageGroup, setAgeGroup]= useState("")
    var today_date = new Date();
    var dd = String(today_date.getDate()).padStart(2, '0');
    var mm = String(today_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today_date.getFullYear();
    today_date = dd + '-' + mm + '-' + yyyy;


    const [time, setTime] = useState(Date.now());

    useEffect(() => {
      const interval = setInterval(() => setTime(Date.now()), 2700000);
      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(()=>{
        axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin', {
            params: {
              pincode:String(pincode),
              date:String(today_date)
            }
          })
          .then(function (response) {
            console.log(response.data.centers)
            setData(response.data.centers)
          })
          .catch(function (error) {
            console.log(error);
          })
    },[pincode, time])

    let SearchPin=()=>{
        if(myref.current.value.length!=6 &&  ageGroup=="")
            alert("Enter 6 digit PIN")
        if(!Number(myref.current.value))
            alert("Only Number allowed")
        else{
            setPin(myref.current.value);
        }
    }

    let handleRadioChange=(e)=>{
      console.log(e)
      setAgeGroup(e.target.value)
    }
    return (
        <div>
            {
            pincode.length==0 || ageGroup == ""
            ?
            <Grid style={{height:'100vh', width:'100vw'}}
            container
            direction="column"
            justify="center"
            alignItems="center"
            className="Pincode">
            <Grid item>
              <TextField id="outlined-basic" label="Pincode" variant="outlined" inputRef={myref}/>
            </Grid>
            <br/>
            <span>Select age</span>
            <Grid item>
            <RadioGroup aria-label="quiz" name="quiz" onChange={handleRadioChange}>
              <FormControlLabel value="18" control={<Radio />} label="18+" />
              <FormControlLabel value="45" control={<Radio />} label="45+" />
            </RadioGroup>
            <Button
                variant="contained"
                color="primary"
                onClick={SearchPin}
            >
                Send
            </Button>
            </Grid>
            </Grid>
            :
            <ShowList data={data} ageGroup={ageGroup}/>
}
        </div>
    );
};


export default Pincode;