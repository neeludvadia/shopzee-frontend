export const fetchProducts = async (setIsLoading:(value:boolean)=>void , selectedTab:number)=>{
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



export const fetchProductsById = async (id:number)=>{
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

export const fetchProductsByCategory = async (category:string)=>{
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/productCategory?Id=${category}`,
      {
        headers:{
          "Content-Type":'application/json'
        },
         method:'get',
      }
    )
    if(response.ok){
      const data = await response.json()
      return data.data;
    }else{
      console.log(await response.json());
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    
  }
}


export const fetchAllCategories = async ()=>{
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/AllCategories`,
      {
        headers:{
          "Content-Type":'application/json'
        },
         method:'get',
      }
    )
    if(response.ok){
      const data = await response.json()
      return data.data;
    }else{
      console.log(await response.json());
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    
  }
}

export const userAuthenticate = async (user:ClerkAuthorization)=>{
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/login`,
      {
        headers:{
          "Content-Type":'application/json'
        },
         method:'POST',
         body:JSON.stringify(user)
      }
    )
    if(response.ok){
      const data = await response.json()
      return data;
    }else{
      console.log(await response.json());
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    
  }
}