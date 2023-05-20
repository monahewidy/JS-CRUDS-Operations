//1 get total
//2 creat product
//3 save localstorage
//4 clear inputs after add it with creat button
//5 read and add in table
//6 count (no. of proudacts that will add )
//7 delete
//8 update
//9 search
//10 clean data 

//1 get total
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create'; //الفكره منها اننا نستخدمها فى اكتر من حاله & فى سهوله للتعديل او حتى الالغاء زى فى الحاله هنا
let tmp ; // global variable , we can use it in every where 

total.innerHTML='';

function getTotal(){
    if (price.value != ""){
        total.innerHTML=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background="rgb(19, 176, 61)" //green
    }
    else{
        total.style.background="rgb(220, 50, 50)"; //red
        total.innerHTML='';
    }
}

//2 creat products
// coding arrange important for logic bec. JS read from top to end
//save items in array
let dataItem ;
if (localStorage.saveIteam != null){
    dataItem = JSON.parse(localStorage.saveIteam);   //make it array 
}else{
    dataItem = [];
}
// creat broject for each new product
submit.onclick = function (){
    let newItem = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

if(title.value && category.value && price.value != '' && newItem.count <= 100){  //not add empty item, empty price, empty category and control the no. of add new items
    if (mood === 'create'){          //now this button contain create and update
        //6 count (no. of proudacts that will add )
            if(newItem.count > 1){ //و لازم اكتب اكتر من الواحد لان دى البدايه لان الفكره فى العدد اللى اكبر من واحد
                for(let i = 0; i < newItem.count; i++){
                dataItem.push(newItem);    // push add new opject to the end of index in the array & save it
                }
            }else{ // يعنى لو الرقم اللى داخل واحد بس او اقل
                dataItem.push(newItem); // this will be add one item
                }
            clearData() //to remove input value after add it to the table
        }else{  
            //it is mean mood = 'update', now i will update the array data in this mood
            dataItem[ tmp ] = newItem ; 
            //after add the update data to the table, i want everything return back as the create product content not update
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
}
// if i reload the data will delet so need save it into localStorage
//3 save localstorage
    localStorage.setItem('saveIteam',      JSON.stringify(dataItem)       )   // make it string & accept array
    showDate() //to show data in the table afte click on create button
}

//4 clear inputs after add it with creat button
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

//5 read and add in table
function showDate(){
    let table='';
    for(let i = 0; i < dataItem.length; i++){
        //we use for loop to use data
        // we make it += to save the old data & add new one to it
        // to start from no. 1 add 1 like i+1
        table += `
        <tr>
            <td>${i+1}</td>               
            <td>${dataItem[i].title}</td>
            <td>${dataItem[i].price}</td>
            <td>${dataItem[i].taxes}</td>
            <td>${dataItem[i].ads}</td>
            <td>${dataItem[i].discount}</td>
            <td>${dataItem[i].total}</td>
            <td>${dataItem[i].category}</td>
            <td><button id="update" onclick="updateItem(${i})">update</button></td>
            <td><button id="delete" onclick="deletItem (${i})"> delete </button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;

let btnDeleteAll = document.getElementById('deleteAll');
if(dataItem.length > 0 ){
    btnDeleteAll.innerHTML = `
    <button onClick="deleteAll()"> Delete All ( ${dataItem.length} ) </button>   
    `
    //to add no. of producs we add JS into HTMl by use ${}
}else{
    btnDeleteAll.innerHTML = '';
}

getTotal(); //i call this function again, i need it show again after creat or update data

}
showDate();  // i need it to show always whenn add new item so i put it here to run always

//7 delete
function deletItem (i){
    dataItem.splice(i,1);
    localStorage.saveIteam = JSON.stringify(dataItem);
    showDate()
}

// delet all 
function deleteAll(){
    localStorage.clear;
    dataItem.splice(0);
    showDate()
}

//8 update
function updateItem(i){
    //here i select the items that their value will return , bring value from array and the number (i) , select the item name from array
    title.value = dataItem[i].title; 
    price.value = dataItem[i].price;
    taxes.value = dataItem[i].taxes;
    ads.value = dataItem[i].ads;
    discount.value = dataItem[i].discount;
    category.value = dataItem[i].category;
    count.style.display="none"; //remove the count 
    getTotal();                //call total
    submit.innerHTML="update"; //change a name
    mood = 'update';
    tmp = i; // so we can use (tmp) as (i) exactly
    scroll({
        top: 0,
        behavior: "smooth",
    })
}


//9 search

let searchMood = 'title';
function getSelectMood (id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'search by '+ searchMood;
    search.focus()   //open this tap for user
    search.value='',  //after select get the input par clear
    showDate()    // show all data again 
}

function searchData(value)
{
    let table = '';
    for(let i=0; i<dataItem.length; i++){   //use loop for array
    if(searchMood == 'title')
    {
            if(dataItem[i].title.includes(value.toLowerCase())){  //use includes for string
                
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataItem[i].title}</td>
                    <td>${dataItem[i].price}</td>
                    <td>${dataItem[i].taxes}</td>
                    <td>${dataItem[i].ads}</td>
                    <td>${dataItem[i].discount}</td>
                    <td>${dataItem[i].total}</td>
                    <td>${dataItem[i].category}</td>
                    <td><button id="update" onclick="updateItem(${i})">update</button></td>
                    <td><button id="delete" onclick="deletItem (${i})"> delete </button></td>
                </tr>
                `
            }
    }else      // category
    { 

            if(dataItem[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataItem[i].title}</td>
                    <td>${dataItem[i].price}</td>
                    <td>${dataItem[i].taxes}</td>
                    <td>${dataItem[i].ads}</td>
                    <td>${dataItem[i].discount}</td>
                    <td>${dataItem[i].total}</td>
                    <td>${dataItem[i].category}</td>
                    <td><button id="update" onclick="updateItem(${i})">update</button></td>
                    <td><button id="delete" onclick="deletItem (${i})"> delete </button></td>
                </tr>
                `
            }
    }
    document.getElementById('tbody').innerHTML = table;
    }
}






