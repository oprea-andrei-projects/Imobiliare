
let doc = document.querySelector(".container");


function generateFirstpage(){


    let arr=[];
    let ar1=[];
    let ar2=[];
    let ar3=[];

    doc.innerHTML = `

    <section class="titlu">
    <h1>Andrei's Imobiliare Company</h1>

</section>


<section class="cautare">
    <legend>Serch for your house here : </legend>

    <fieldset>
        

        <div class="box">
            <label for="tip-casa">Tip Casa:</label>
            <select class="tip-casa">
                

            </select>
        </div>

        <div class="box">
            <label for="zona">Zona:</label>
            <select class="zona">
                
            </select>
        </div>

        <div class="box box-pret">
           

        </div>

        

    </fieldset>

    <input type="button" class="cauta" name="Cauta" id="btn-cautare" value="Cauta">

</section>
    

    `
    populateWithTypes(data);
    populateWithArea(data);
    populateWithPrice(data);


    let btn = document.querySelector(".cauta");

    //preturi

    let labelPretMin = document.querySelector(".lblPretMinim");
    let inputPretMin = document.querySelector(".pretMinim");
    
    let labelPretMaxim = document.querySelector(".lblPretMaxim");
    let inputPretMaxim = document.querySelector(".pretMaxim");

    btn.addEventListener("click", ()=>{

        setHomes(arr);
    });

    inputPretMin.addEventListener("input",(e)=>{

        labelPretMin.textContent = "Pret minim:"+inputPretMin.value;
       
        

    });

    inputPretMaxim.addEventListener("input",(e)=>{

        labelPretMaxim.textContent = "Pret maxim:"+inputPretMaxim.value;

        ar1 = filterHouseByPrice(data,inputPretMin.value, inputPretMaxim.value);

    });


// tip casa

    let tipcasa = document.querySelector(".tip-casa");

    tipcasa.addEventListener("change",(e)=>{

        let myValue = tipcasa.value;

       ar2 = filterHouseByType(data,myValue);



    });

// zona

    let myZona = document.querySelector(".zona");

    myZona.addEventListener("change",(e)=>{

        let x = myZona.value;

        console.log(x);

        ar3 = filterHouseByArea(data,x);


    });

    let myArrays = [ar1,ar2,ar3];

    arr = myArrays.reduce((accumulator, currentArr)=>{

        return intersectArr(accumulator,currentArr);
    },myArrays[0]);



    
}

function setHomes(arr){


    doc.innerHTML = `
    
    <h1>Your House<h1>
    <section class="case">


    </section>
    
    
    `

    populateHomes(arr);


}


let populateHomes = (arr)=>{

    let homes = document.querySelector(".case");

    let text =``;

    arr.forEach(element => {
        text+=`
        
        <div class="casa">

            <img src="${element.url}">
            <p>${element.tip},${element.zona},${element.pret}</p>

        </div>
        
        
        `

    });

    homes.innerHTML=text;

}


let populateWithTypes = (arr)=>{

    let typedoc = document.querySelector(".tip-casa");

    let text = ``;

    let myarr=[];

    arr.forEach(e =>{

        if(myarr.includes(e.tip)==false){

            text+=`
        
             <option>${e.tip}</option>
        
        
              `
        }

        myarr.push(e.tip);

        

    });

    typedoc.innerHTML = text;



}


let populateWithArea = (arr)=>{

    let zonaarr = document.querySelector(".zona");

    let text = ``;

    let myarr=[];

    arr.forEach(e=>{

        if(myarr.includes(e.zona)==false){


            text+=`
            
                <option>${e.zona}</option>
            
            
            `
        }

        myarr.push(e.zona);



    });

    zonaarr.innerHTML = text;
}

let populateWithPrice = (arr)=>{

    let pricearr = document.querySelector(".box-pret");

    let text=``;

    let myarr=[];

    text=`
    
    <label class="lblPretMinim" for="pret">Pret minim:1000 </label>
    <input class="pretMinim" type="range" id="volume" min="1000" max="10000" value="5000" step="1000">
    <label class="lblPretMaxim" for="pret">Pret maxim:10000</label>
    <input class="pretMaxim" type="range" id="volume" min="1000" max="10000" value="0" step="1000">
    
    
    
    
    `

    pricearr.innerHTML = text;




}


function filterHouseByType(arr, type){

    let typearr=[];

    arr.forEach(home=>{

        if(home.tip==type){

            typearr.push(home);
        }

    });

    return typearr;


}

function filterHouseByArea(arr, area){

    let areaArr = [];

    arr.forEach(home=>{


        if(home.zona==area){

            areaArr.push(home);
        }
    });

    return areaArr;
}

function filterHouseByPrice(arr, minPrice, maxPrice){


    let pricearr=[];

    arr.forEach(home=>{

        if(home.pret >= minPrice && home.pret <= maxPrice){

            pricearr.push(home);
        }
    });

    return pricearr;
}

function intersectArr(arr1,arr2){

    let arr3=[];

    arr1.forEach(e=>{

        if(arr2.includes(e)==true){

            arr3.push(e);
        }
    });

    return arr3;

}

function reducere(arr){

    let newArr=[];

    newArr.reduce(intersectArr(arr[0],arr[1]),arr[0]);


    return newArr;



}