import React, { useEffect, useState } from 'react'
import {collection, addDoc, Timestamp, query, orderBy,where, onSnapshot,doc,getDoc,getDocs, QuerySnapshot, setDoc} from 'firebase/firestore'
import { db } from './firebase'
import './planScreen.css'
import { useSelector } from 'react-redux'
import { selectUser } from './features/counter/counterSlice'
import { loadStripe } from '@stripe/stripe-js'

const PlanScreen = () => {
const [product, setProducts]=useState([])
const user = useSelector(selectUser)
const [subscription, setSubscriptions] = useState(null)
const loadCheckOut= async(priceId)=>{

try{
 const docRef= await addDoc(collection(db,`customers/${user.uid}/checkout_sessions`),{price:priceId,success_url:window.location.origin,cancel_url:window.location.origin, timestamp:Timestamp.now()})
onSnapshot(docRef,async(doc)=>{

  const {error, sessionId} = doc.data()
 if (error){
   alert (`${error.message}`)
 }
if (sessionId){
   const stripe= await loadStripe("pk_test_51KvGvvEHKAMPLAemrf0VnrINHYdRJQt22lzJUpm8tzay5Sl0ootYg9ViNq6yrStrYyPtsDSHX3BqDHwiNBO6wWvE000r4ySasB")
   stripe.redirectToCheckout({sessionId})
}
})
}
  catch(error){console.log(error)}



}

useEffect( ()=>{
  const q =  query(collection (db,`customers/${user.uid}/subscriptions`))
  onSnapshot(q,(subs)=>{subs.docs.map((doc)=>{
   setSubscriptions({
     role:doc.data().role,
     current_period_end:doc.data().current_period_end.seconds,
     current_period_start:doc.data().current_period_start.seconds
   })
    
  })})
},[])

console.log(subscription)
//RETRIEVE FOR FIRESTORE "PRODUCTS"
useEffect(()=>{
const q = query(collection(db,'products'),(where('active','==',true)))
onSnapshot(q,(querySnapshot)=>{
  const products={}
  querySnapshot.forEach(async(productDoc)=>{
    products[productDoc.id]=productDoc.data()
    let PriceRef = collection(db, `products/${productDoc.id}/prices`); //groups is my sub-collection name
    const PricesDoc = await getDocs(PriceRef);

    PricesDoc.forEach((price) => products[productDoc.id].prices={priceId:price.id, priceData:price.data()});
    
  })

setProducts(products)
})


},[])

const d = new Date();
  return (

    <div className='planScreen'>
      {subscription && <p>Renewal Date: {new Date(subscription.current_period_end*1000).toLocaleDateString()}</p>}
      {Object.entries(product).map(([productID, productData])=>{
        
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)
      console.log(subscription.current_period_end)
        return(
          <div key={productID} className='planScreen__plan'>
            <div className='planScreen__info'>
              <h5>  {productData.name}</h5>
              <h6>{productData.description}</h6>
              
            </div>
            <button className={`${isCurrentPackage && "current"}`} onClick={()=>{!isCurrentPackage && loadCheckOut(productData?.prices?.priceId)}}>{isCurrentPackage ? ("Current Package"):("Subscribe")}</button>
          </div>
        )
      })}
      </div>
  )
}

export default PlanScreen