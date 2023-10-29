'use client'
import React, {  createContext, useContext,useEffect,useRef,useState } from "react"
import { toast } from "react-hot-toast"
import { signInWithPopup, GoogleAuthProvider ,onAuthStateChanged, signOut} from "firebase/auth";
import { auth, db } from "@/app/firebase";
import { doc, setDoc,getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

const Context=createContext()
export const useStateContext=()=>useContext(Context)

export const StateContext =({children})=>{
    const [qty, setqty] = useState(1)
    const [showCart, setshowCart] = useState(false)
    const [cartItems, setcartItems] = useState([])
    const [price, setprice] = useState(0)
    const [totalQty, settotalQty] = useState(0)
    const [user,setuser]=useState(null)
    const [showMessage,setshowMessage]=useState(false)
    const Qty=useRef(0)
    const priceValue=useRef(0)

    useEffect(()=>{setcartItems([])},[user])

        // const changeTotalQty=async()=>{
        //     const cartRef=collection(db,'cart')
        //     const q=query(cartRef,where('email','==',user.email))
        //     const querySnapshot = await getDocs(q);
        //        querySnapshot.forEach((doc) => {
        //           const num=value.current
        //           value.current=num+doc.data().quantity
        //         settotalQty(value.current)
        //        });
        // }
    
    const onAdd=async(product,quantity)=>{
        const docRef1 = doc(db, "cart", `${product.name}-${user.email}`);
        const docSnap1 = await getDoc(docRef1);
        const dbQty= await docSnap1.data()?.quantity

        // console.log(dbQty.quantity)
        const cartProduct={...product,email:user.email,quantity:dbQty ? dbQty+quantity:quantity}
        await setDoc(doc(db,'cart',`${product.name}-${user.email}`),cartProduct)

        settotalQty(totalQty+quantity)
        setprice(price+product.price*quantity)

        // const docRef2 = doc(db, "cart", `${user.email}`);
        // const docSnap2 = await getDoc(docRef2);
        // const dbTotalQty= await docSnap2.data()?.totalQty
        // const dbTotalPrice=await docSnap2.data()?.totalPrice

        // async function check(){
        //     if(dbTotalQty){
        //       settotalQty(dbTotalQty+quantity) 
        //       setprice(dbTotalPrice+product.price*quantity) 
        //       return {totalPrice:dbTotalPrice+product.price*quantity,totalQty:dbTotalQty+quantity}
        //     }
        //     else{
        //       settotalQty(quantity)
        //       setprice(product.price*quantity)
        //       return {totalPrice:product.price*quantity,totalQty:quantity}
        //     }
        // }
        // const priceAndQty=await check()

        // await setDoc(doc(db,'cart',`${user.email}`),priceAndQty)
        // const checkProductOnCart=()=>{
        //     return cartItems.find((item)=>{
        //          return item?._id===product._id})}
        // if(checkProductOnCart()){
        //     setcartItems((prevItems)=>{
        //         return prevItems.map((item)=>{
        //            if(item._id===product._id){
        //              return {...item,quantity:item.quantity+quantity}
        //            }
        //         })
        //     })
        //     settotalQty((prevQty)=>prevQty+quantity)
        //     setprice((prevPrice)=>prevPrice+product.price*quantity)
        // }
        // else{
        //     setcartItems((prevItems)=>[...prevItems,{...product,quantity:quantity}])
        //     setprice((prevPrice)=>prevPrice+product.price*quantity)
        //     settotalQty((prevQty)=>prevQty+quantity)
        // }
        toast.success(`${quantity} ${product.name} Added to the cart`)
    }
    const onCartOpen=async()=>{
        const cartRef=collection(db,'cart')
        const q=query(cartRef,where('email','==',user.email))
        const querySnapshot = await getDocs(q);
           querySnapshot.forEach((doc) => {
            //   console.log( doc.data());
            setcartItems((prevItems)=>{
               const newItems= prevItems.filter((item)=>item._id!==doc.data()._id)
               return[...newItems,doc.data()]
            })
           });
        setshowCart(true)
        
    }
    const viewMessage=()=>{
        setshowMessage(true)
    }
    const closeMessage=()=>{
        setshowMessage(false)
    }
    const incQty=()=>setqty((prev)=>prev+1)
    const decQty=()=>setqty((prev)=>{
        if(prev==1){return 1}
        else{return prev-1}
    })
    const removeCartItem=async(product)=>{
        // setcartItems((prevItems)=>(
        //     prevItems.filter((item)=>item._id!==product._id)
        // ))
        // settotalQty((prevQty)=>(prevQty-product.quantity))
        // setprice((prevPrice)=>(prevPrice-(product.quantity*product.price)))
        await deleteDoc(doc(db, "cart",`${product.name}-${user.email}` ));
        setcartItems((prevItems)=>{
            const newItems= prevItems.filter((item)=>{
                if(item._id!==product._id){
                    return item
                }
            })
            return newItems
         })
         settotalQty(totalQty-product.quantity)
         setprice(price-product.price*product.quantity)

        //  const docRef2 = doc(db, "cart", `${user.email}`);
        //  const docSnap2 = await getDoc(docRef2);
        //  const dbTotalQty= await docSnap2.data()?.totalQty
        //  const dbTotalPrice=await docSnap2.data()?.totalPrice

        //  const priceAndQty={totalPrice:dbTotalPrice-product.price*product.quantity,totalQty:dbTotalQty-product.quantity}

        //  await setDoc(doc(db,'cart',`${user.email}`),priceAndQty)
        //  settotalQty(dbTotalQty-product.quantity)
        //  setprice(dbTotalPrice-product.price*product.quantity)

        toast.success(`${product.name} Removed From Cart`)
    }
    const incCartProductQty=async(product)=>{
        // setprice((prevPrice)=>prevPrice+product.price)
        // settotalQty((prevQty)=>prevQty+1)
        // setcartItems((prevItems)=>(
        //     prevItems.map((item)=>{
        //         if(item._id==product._id){
        //             item.quantity=item.quantity+1
        //         }
        //         return item
        //     })
        // ))
        const cartProduct={...product,quantity:product.quantity+1}
        await setDoc(doc(db,'cart',`${product.name}-${user.email}`),cartProduct)
        const docRef=await getDoc(doc(db,'cart',`${product.name}-${user.email}`))
        // console.log(docRef.data().quantity);
        setcartItems((prevItems)=>{
            const newItems= prevItems.map((item)=>{
                if(item._id===docRef.data()._id){
                    return {...item,quantity:docRef.data().quantity}
                }
                else{
                    return item
                }
            })
            return newItems
         })
         settotalQty(totalQty+1)
         setprice(price+product.price)
        //  const docRef2 = doc(db, "cart", `${user.email}`);
        //  const docSnap2 = await getDoc(docRef2);
        //  const dbTotalQty= await docSnap2.data()?.totalQty
        //  const dbTotalPrice=await docSnap2.data()?.totalPrice

        //  const priceAndQty={totalPrice:dbTotalPrice+product.price,totalQty:dbTotalQty+1}

        //  await setDoc(doc(db,'cart',`${user.email}`),priceAndQty) 
        //  settotalQty(dbTotalQty+1)
        //  setprice(dbTotalPrice+product.price)
    }
    const decCartProductQty =async(product)=>{
        if(product.quantity===1){
            removeCartItem(product)
        }
        else{
            // setprice((prevPrice)=>prevPrice-product.price)
            // settotalQty((prevQty)=>prevQty-1)
            // setcartItems((prevItems)=>(
            //     prevItems.map((item)=>{
            //         if(item._id==product._id){
            //             item.quantity=item.quantity-1
            //         }
            //         return item
            //     })
            // ))
            const cartProduct={...product,quantity:product.quantity-1}
            await setDoc(doc(db,'cart',`${product.name}-${user.email}`),cartProduct)
            const docRef=await getDoc(doc(db,'cart',`${product.name}-${user.email}`))
            // console.log(docRef.data().quantity);
            setcartItems((prevItems)=>{
                const newItems= prevItems.map((item)=>{
                    if(item._id===docRef.data()._id){
                        return {...item,quantity:docRef.data().quantity}
                    }
                    else{
                        return item
                    }
                })
                return newItems
             })
             settotalQty(totalQty-1)
             setprice(price-product.price)
            //  const docRef2 = doc(db, "cart", `${user.email}`);
            //  const docSnap2 = await getDoc(docRef2);
            //  const dbTotalQty= await docSnap2.data()?.totalQty
            //  const dbTotalPrice=await docSnap2.data()?.totalPrice
    
            //  const priceAndQty={totalPrice:dbTotalPrice-product.price,totalQty:dbTotalQty-1}
    
            //  await setDoc(doc(db,'cart',`${user.email}`),priceAndQty)
            //  settotalQty(dbTotalQty-1)
            //  setprice(dbTotalPrice-product.price)
        }
        
    }
    const onSuccessPayment=async()=>{
        if(user){const cartRef=collection(db,'cart')
        const q=query(cartRef,where('email','==',user.email))
        const querySnapshot = await getDocs(q);
           querySnapshot.forEach(async(Doc) => {
             await deleteDoc(doc(db,'cart',`${Doc.data().name}-${user.email}`))
           });
        setcartItems([])
        setprice(0)
        settotalQty(0)}
    }
    const googleSignIn =()=>{
        const provider=new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }
    const googleSignOut=()=>{
        signOut(auth)
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,(currUser)=>{
            setuser(currUser)
        })
        return ()=>{
            unSubscribe(); 
        }
    },[user])
    useEffect(()=>{
        if(user){toast.success(`Welcome,${user.displayName} You have successfully signed in with your Google account.`)}
    },[user])
    useEffect(()=>{
        const showQty=async()=>{
            if(user){
            const cartRef=collection(db,'cart')
            const q=query(cartRef,where('email','==',user.email))
            const querySnapshot = await getDocs(q)
               querySnapshot.forEach((doc) => {
                  const num1=Qty.current
                  Qty.current=num1+doc.data().quantity

                  const num2=priceValue.current
                  priceValue.current=num2+doc.data().price*doc.data().quantity
               });
            settotalQty(Qty.current)
            setprice(priceValue.current)
            Qty.current=0
            priceValue.current=0

            // const docRef2 = doc(db, "cart", `${user.email}`);
            // const docSnap2 = await getDoc(docRef2);
            // const dbTotalQty= await docSnap2.data()?.totalQty
            // const dbTotalPrice=await docSnap2.data()?.totalPrice
            // setprice(dbTotalPrice?dbTotalPrice:0)
            // settotalQty(dbTotalQty?dbTotalQty:0)
            }  
            else{
                settotalQty(0)
            }  
        }
        showQty();
    },[user,totalQty,price])

    const onReviewSubmit=async(productName,value)=>{
        const reviewDoc={value:value,userName:user.displayName}
        await setDoc(doc(db,'reviews',`${productName}`,`${user.displayName}`),reviewDoc)
    }
    return(
        <Context.Provider value={{
            qty,incQty,decQty,setqty,onAdd,cartItems,price,totalQty,showCart,setshowCart,removeCartItem,
            incCartProductQty,decCartProductQty,googleSignIn,googleSignOut,user,viewMessage,closeMessage,
            showMessage,onCartOpen,onSuccessPayment,onReviewSubmit
        }}>
            {children}
        </Context.Provider>
    )
}
