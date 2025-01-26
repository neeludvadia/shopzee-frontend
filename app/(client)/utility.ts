export const fetchProducts = async (setIsLoading:(value:boolean)=>void , selectedTab:Number)=>{
  setIsLoading(true);
  try {
    const response = await fetch(`/api/fetchProducts`,
      {
        headers:{
          "Content-Type":'application/json'
        },
         method:'post',
        body:JSON.stringify({
          productType:selectedTab
        })
      }
    )
    if(response.ok){
      const data = await  response.json()
      setIsLoading(false);
      return data;
    }else{
      console.error(await response.json());
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    
  }
}