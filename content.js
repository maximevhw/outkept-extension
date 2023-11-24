const body = document.querySelector('body');
const observerConfig = {
    childList: true, // Watch for changes in the child elements of the target
    subtree: true, // Watch for changes in the entire subtree, not just the direct children
};

const callback = (mutationList, observer) => {
    const h1Element = body.querySelector('h1');
    const table = body.querySelector('table');
    if (h1Element && h1Element.innerText === "Claim your bounties" && table) {
        const rows = table.rows;
        if (rows[1].className !== "p-datatable-emptymessage") {
            console.log("bountie page reached");
            addPriceField();
            observer.disconnect();
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(body, observerConfig);

function addPriceField() {
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

    document.querySelector("table.p-datatable-table tbody").insertAdjacentHTML("beforeend", totalRow);
    
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parsePrices(pricesArray) {
  const parsedPrices = [];
    
  pricesArray.forEach(priceString => {
    const cleanedPrice = parseFloat(priceString.replace(/€\s+/g, '').replace(',', '.'));
  
    if (!isNaN(cleanedPrice)) {
        parsedPrices.push(cleanedPrice);
    } else {
      console.error("a price wasnt parced properly");
    }
  });
  
  return parsedPrices;
}

function sumArray(arr) {
  return arr.reduce((total, currentValue) => total + currentValue, 0);
}
  