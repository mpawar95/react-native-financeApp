import moment from "moment"
export const convertDate = d => {
    dt = new Date(d);
    dformat = moment(dt).format("YYYY-MM-DD");
    return dformat;
  };
  
  export const convertDateForUI = d => {
    dt = new Date(d);
    dformat = moment(dt).format("DD.MM.YYYY");
    return dformat;
  };
  
  export const convertTimeForUI = d => {
    dt = new Date(d);
    dformat = moment(dt).format("HH:mm");
    return dformat;
  };
  
  export const getDateYear = d => {
    dt = new Date(d);
    dformat = moment(dt).format("YYYY");
    return dformat;
  };
  export const convertMyDate=d=>{
    dt = new Date(d);
    dformat = moment(dt).format("MMMM DD, YYYY");
    return dformat;
  }
  export const todayDate =()=>{
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 
    todayDate= month+ "/" + date+"/"+year
    return todayDate
  }
  export const week=(date)=>{
    var curr = new Date(date); 
    var first = curr.getDate() - curr.getDay(); 
    var last = first + 6; 
    var firstday = new Date(curr.setDate(first)); 
    var lastday = new Date(curr.setDate(last));
    return firstday + " " + lastday
  }
  export const today = moment();
  export const from_month = moment().startOf('month').toString();
  export const to_month = today.toString();
  export const from_year = moment().startOf('year').toString();
  export const to_year = today.toString();
  export const yesterday=moment().subtract(1, 'days').calendar('DD.MM.YYYY').toString()
  export const from_week = moment().startOf('week').toString();
  export const to_week = today.toString();