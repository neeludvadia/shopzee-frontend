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



export const fetchProductsById = async (id:Number)=>{
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/productsId?Id=${id}`,
      {
        headers:{
          "Content-Type":'application/json'
        },
         method:'get',
      }
    )
    if(response.ok){
      const data = await response.json()
      return data.message;
    }else{
      console.log(await response.json());
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    
  }
}