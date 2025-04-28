import { useEffect, useState } from "react";


// custom hook for comparison data
export const useComparisonData = (latitude: number, longitude: number) => {
    // comparison data useState
    const [comparisonData, setComparisonData] = useState<any>(null);
    const [comparisonDataError, setcomparisonDataError] = useState<string | null>(null);
    

    useEffect (() => {
        // fetch request for comparison data
        const fetchcomparisonData = async () => { 

            if (!latitude || !longitude) {
                setcomparisonDataError('Missing Latitude/Longitude');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/comparisonData?lat=${latitude}&lon=${longitude}`);

            if(!response.ok) throw new Error('Network response not ok');
            
            const data = await response.json();
            setComparisonData(data);

            } catch (err) {
                if (err instanceof Error) setcomparisonDataError(err.message); 
                else setcomparisonDataError('An error occurred in fetchcomparisonData');
            }
        };

        fetchcomparisonData();
    }, [latitude, longitude]);

    return { comparisonData, comparisonDataError };
};


// custon hook for pod
export const usePodData = () => {
    // pod useState
    const [podData, setPodData] = useState<any>(null);
    const [podDataError, setPodDataError] = useState<string | null>(null);

    useEffect (() => {

        // fetch request for pod data
        const fetchPodData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/pod');

                if(!response.ok) throw new Error('network response not ok');
                
                const data = await response.json();
                setPodData(data);
                

            } catch (err) {
                if (err instanceof Error) setPodDataError(err.message);
                else setPodDataError('An error occurred in fetchPodData');
            }
        } 

        fetchPodData();
    }, []);

    return { podData, podDataError };
};    


export const useRandomPics = () => {
    // pod useState
    const [RandomPics, setRandomPics] = useState<any>(null);
    const [RandomPicsError, setRandomPicsError] = useState<string | null>(null);

    useEffect (() => {
        // fetch request for comparison data
        const fetchcomparisonData = async () => { 

            try {
                const response = await fetch('http://localhost:3000/api/randomPics');

            if(!response.ok) throw new Error('Network response not ok');
            
            const data = await response.json();
            setRandomPics(data);

            } catch (err) {
                if (err instanceof Error) setRandomPicsError(err.message); 
                else setRandomPicsError('An error occurred in fetchcomparisonData');
            }
        };

        fetchcomparisonData();
    }, []);

    return { RandomPics, RandomPicsError };
};