import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'


export function useAsyncStorage<T>(key:string,initialValue:T){
  const [storedValue,setStoredValue] = useState<T | null>(null);
  const [loading,setLoading]  =useState(true);
  const [error,setError] = useState<Error|null>(null);

  // load on mount 
  useEffect(()=>{
     (
      async ()=>{
        try {
          const jsonVal = await AsyncStorage.getItem(key);
          if(jsonVal!=null){
            setStoredValue(JSON.parse(jsonVal));
          }else{
            setStoredValue(initialValue);
          }
        } catch (error) {
          setError(error as Error)
        }finally{
          setLoading(false);
        }
      }
     )();
  },[key]);

  const setValue  = useCallback(
    async(value: T)=>{
      try {
        const jsonVal = JSON.stringify(value);
        await AsyncStorage.setItem(key,jsonVal);
        setStoredValue(value);
      } catch (error) {
        setError(error as Error);
      }
    },[key])

    const removeValue = useCallback(
      async()=>{
        try {
          await AsyncStorage.removeItem(key);
          setStoredValue(null);  
        } catch (error) {
          setError(error as Error);
        }
        
      },[key]
    )

    return{
      value:storedValue,
      setValue,
      removeValue,
      loading,
      error
    }
}