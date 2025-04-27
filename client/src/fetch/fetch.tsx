import { useEffect, useState } from "react";


// comparison data useState
const [comparisonData, setComparisonData] = useState<any>(null);
const [comparisonDataError, setcomparisonDataError] = useState<string | null>(null);

// fetch request for comparison data
useEffect (() => {
    
    const fetchcomparisonData = async () => { 
        try {
            const response = await fetch('http://localhost:3000/api/comparisonData');

        if(!response.ok) throw new Error('Network response not ok');
        
        const data = await response.json();
        setComparisonData(data);

        } catch (err) {
            if (err instanceof Error) setcomparisonDataError(err.message); 
            else setcomparisonDataError('An unknown error occurred');
        }
    };

    fetchcomparisonData();
}, []);


// pod useState
const [podData, setPodData] = useState<any>(null);
const [podDataError, setPodDataError] = useState<string | null>(null);

// fetch request for pod data
useEffect (() => {

    const fetchPodData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pod');

            if(!response.ok) throw new Error('network response not ok');
            
            const data = await response.json();
            setPodData(data);
            
        } catch (err) {
            if (err instanceof Error) setPodDataError(err.message);
            else setPodDataError('An unknown error occurred');
        }
    } 

    fetchPodData();
}, []);


// export data
export default { comparisonData, comparisonDataError, podData, podDataError}