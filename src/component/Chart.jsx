import {Line}from "react-chartjs-2"; 
import {Chart as chartjs,CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend} from "chart.js"; 
chartjs.register( 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)
const Chart=({arr=[],days,currency})=>{  
    const prices=[] ; 
    const date=[] 
    for(let i=0;i<arr.length;i++){ 
        if(days==="24h")   date.push(new Date(arr[i][0]).toLocaleTimeString()); 
       else date.push(new Date(arr[i][0]).toLocaleDateString()); 
        prices.push(arr[i][1])
    }
    const data={
        labels:date, 
        datasets:[{
            label:`Price in ${currency}`, 
            data:prices,
            borderColor:"rgb(255,99,132)", 
            backgroundColor:"rgb(255,99,132,0.5)"
        }]
     }
    return(
     <Line options={{responsive:"true"}} 
     data={ data}
     /> 
    )
} 
export default Chart;