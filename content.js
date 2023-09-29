sleep(1000).then(() => { 
    const table = document.querySelector("table.p-datatable-table");

    const bountiecells = table.querySelectorAll("tbody tr td:nth-child(4) div");

    let bounties = [];

    bountiecells.forEach(bountie => {
        bounties.push(bountie.innerText);
    })

    const total = sumArray(parsePrices(bounties));

    console.log(total);


    const totalRow = `
                    <tr role="row" draggable="false">
                        <td role="cell" style="width: 20rem;"></td>
                        <td role="cell" style="width: 20rem;"></td>
                        <td role="cell" style="width: 20rem;"></td>
                        <td role="cell" style="width: 20rem;">Total: €&nbsp;${total}</td>
                        <td role="cell" style="width: 20rem;"></td>
                    </tr>`
    //document.querySelector("table.p-datatable-table");
    //table.querySelector("tbody").insertAdjacentElement("beforeend", totalRow);

    document.querySelector("table.p-datatable-table tbody").insertAdjacentHTML("beforeend", totalRow);
    
});




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  function parsePrices(pricesArray) {
    const parsedPrices = [];
    
    pricesArray.forEach(priceString => {
      // Remove euro sign and whitespace, and parse to a double
      const cleanedPrice = parseFloat(priceString.replace(/€\s+/g, '').replace(',', '.'));
  
      // Check if the parsing was successful (not NaN)
      if (!isNaN(cleanedPrice)) {
        parsedPrices.push(cleanedPrice);
      }
    });
  
    return parsedPrices;
  }


  function sumArray(arr) {
    return arr.reduce((total, currentValue) => total + currentValue, 0);
  }
  