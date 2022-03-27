import React from "react";

function fetchProductData() {
    return {
        'A': [60,'2for100'],
        'B': [70,'buy2get1'],
        'C': [10],
        'D': [20]
    }
}

function groupCart(cart) {
    var productGroups = {};

    for (var index in cart) {
        if(productGroups[cart[index]]) {
            productGroups[cart[index]] += 1;
        }
        else {
            productGroups[cart[index]] = 1;
        }
    }

    return productGroups;
}

function applyDiscounts(itemCount,productData) {

    var finalPrices = {};

    for(var item in itemCount){
        var count = itemCount[item];
        var cost = productData[item][0];
        var discount = productData[item][1];

        if(discount){
            if(discount === "2for100" && count >= 2){
                if(count%2 === 0){
                    finalPrices[item] = [count,((count/2) * 100)];
                }
                else {
                    finalPrices[item] = [count, cost + (Math.floor(count/2) * 100)];
                }
                
            }
            else if (discount === "buy2get1" && count >= 2){
                finalPrices[item] = [count + (Math.floor(count/2)),cost * count];
            }
            else {
                finalPrices[item] = [count,count*cost]
            }
        }
        else {
            finalPrices[item] = [count,count*cost]
        }
    }

    return finalPrices;

}

const ItemBin = (props) => {
    var discount = "";

    if(props.discount) {
        if(props.discount === "2for100" && props.count >= 2){
            discount = <p>2 for $100 applied</p>
        }
        else if (props.discount === "buy2get1" && props.count >= 2){
            discount =<p>buy 2 get one free applied</p>;
        }
    }

    return (
        <div>
            <p>{props.name}</p>
            <div>
                <p>Product Name {props.name}</p>
                <p>Description: {props.description}</p>
            </div>
            <div>
                <p>Cost: ${props.discountedPrice}</p>
                <p>x{props.count} at ${props.price}/ea.</p>
                {discount}
            </div>
        </div>
    )
}

const GenerateCart = (props) => {

    var products = fetchProductData();

    var itemCount = groupCart(props.items);

    var discounts = applyDiscounts(itemCount,products);

    var totalCost = 0;

    for (var item in discounts){
        totalCost += discounts[item][1];
    }

    var items = [];

    for(var key in itemCount) {
        items.push(key);
    }

    var itemList=items.map((item,index)=>{
        if(products[item][1]){
            return <ItemBin key={index} name={item} count={discounts[item][0]} price={products[item][0]} discount={products[item][1]} discountedPrice={discounts[item][1]}/>
        }
        else{
            return <ItemBin key={index} name={item} count={discounts[item][0]} price={products[item][0]}  discountedPrice={discounts[item][1]}/>
        }
      })

    return (
        <>
            {itemList}
            <p>Total: ${(totalCost).toFixed(2)}</p>
            <p>Tax: ${(totalCost*0.06).toFixed(2)}</p>
            <p>Grand Total: ${(totalCost + totalCost*0.06).toFixed(2)}</p>
        </>
        
    )
 }

export default class GenerateOrder extends React.Component{
    constructor(props) {
        super(props);
        this.items = props.cart;
    }

    render(){
        return (
          <div className="order-summary">
            <p>Order Summary</p>
            <GenerateCart items={this.items} />
            <button>Edit Cart</button><button>Confirm and Purchase</button>
          </div>
        )
    }
  }