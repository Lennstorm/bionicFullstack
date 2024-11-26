const { db } = require("../../services/index.js");

 async function sortMenuPrice(direction){

    try{
   const data = await db.scan({

            TableName: 'menus-to-db'
        })

        if(!data.Items || data.Items.length == 0){
            return{

                success:false,
                message: 'No menu in database was found'
            }
        }
        let sortedItems
        if(direction === "expensive"){
            sortedItems = data.Items.sort((a,b) => b.price - a.price)
        } else if (direction === "cheap"){
            sortedItems = data.Items.sort((a,b)=> a.price - b.price)
        } else if (direction === "healthy") {
            sortedItems = data.Items.sort((a, b) => b.healthyIndex - a.healthyIndex);
        } else if (direction === "popular") {
            sortedItems = data.Items.sort((a, b) => b.popularIndex - a.popularIndex);
        } else {
            
            return {
                success:false,
                message: 'invalid sorting direction'
            }
        }
         return {
            success:true,
            message: "Menu sorted",
            data: sortedItems
         }
        
}catch(error){

        return {
            success:false, 
            message:error.message
        }
    }
}

module.exports = { sortMenuPrice }


// ******** koden skriven av Peter ***********